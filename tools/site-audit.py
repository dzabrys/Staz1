"""Static quality gates for active pages and current local alternatives. No network."""
import hashlib, html, json, re, sys, os
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote, parse_qs
from xml.etree import ElementTree

ROOT=Path(__file__).resolve().parent.parent
SITE=os.environ.get('SITE_URL','https://dzabrys.github.io/Staz1/')
class Page(HTMLParser):
 def __init__(self,source):
  super().__init__(convert_charrefs=True); self.ids=[]; self.refs=[]; self.images=[]; self.inputs=[]; self.stack=[]; self.base=None; self.h1=0; self.forms=0; self.schema=[]; self.script=False; self.script_text=''; self.feed(source)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.append(a['id'])
  if tag=='base':self.base=a.get('href')
  for key in ['href','src']:
   if a.get(key) and tag!='base':self.refs.append(a[key])
  if a.get('srcset'):
   self.refs.extend(part.strip().split()[0] for part in a['srcset'].split(','))
  if tag=='img':self.images.append(a)
  if tag in ['input','select','textarea'] and a.get('type')!='hidden':self.inputs.append((a,'label' in self.stack))
  if tag=='h1':self.h1+=1
  if tag=='form':self.forms+=1
  if tag=='script' and a.get('type')=='application/ld+json':self.script=True;self.script_text=''
  if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.stack.append(tag)
 def handle_endtag(self,tag):
  if tag=='script' and self.script:
   data=json.loads(self.script_text);self.schema.extend(data if isinstance(data,list) else [data]);self.script=False
  if tag in self.stack:
   i=len(self.stack)-1-self.stack[::-1].index(tag);self.stack=self.stack[:i]
 def handle_data(self,data):
  if self.script:self.script_text+=data

main=[unquote(urlparse(u).path.split('/')[-1]) or 'index.html' for u in re.findall(r'<loc>(.*?)</loc>',(ROOT/'sitemap.xml').read_text(encoding='utf-8'))]
extra=['1/index.html','2/index.html','3/index.html','test-formularzy/kontakt-podglad.html']
extra+=['mobile-propozycje/'+v+'-'+p+'.html' for v in ['siatka','karuzela'] for p in ['szkoly','firmy']]
extra+=['oferta-propozycje/'+v+'.html' for v in 'abcd']
sources={file:(ROOT/file).read_text(encoding='utf-8') for file in main+extra}
parsed={file:Page(source) for file,source in sources.items()}
errors=[];checked=0;fragments=0;hashes=0
def fail(file,text):errors.append(file+': '+text)
for file,page in parsed.items():
 source=sources[file];url=SITE+file;base=urljoin(url,page.base) if page.base else url
 if page.h1!=1:fail(file,'expected exactly one H1')
 duplicates=[key for key,count in Counter(page.ids).items() if count>1]
 if duplicates:fail(file,'duplicate IDs '+str(duplicates))
 expected_robots='index,follow' if file in main and os.environ.get('SITE_INDEX')!='0' else 'noindex,follow'
 if 'name="robots" content="'+expected_robots+'"' not in source:fail(file,'unexpected indexing mode')
 if 'class="search-toggle"' in source:fail(file,'search is visible')
 if not page.schema:fail(file,'missing structured data')
 for image in page.images:
  if 'alt' not in image:fail(file,'image without alt '+str(image.get('src')))
 for attrs,label in page.inputs:
  if not label and not attrs.get('aria-label') and not attrs.get('aria-labelledby'):fail(file,'unlabelled input '+str(attrs.get('name')))
 for ref in page.refs:
  if ref.startswith(('mailto:','tel:','data:')):continue
  target=urlparse(urljoin(base,html.unescape(ref)))
  if target.netloc!=urlparse(SITE).netloc:continue
  if not target.path.startswith('/Staz1/'):
   fail(file,'reference escapes site root '+ref+' -> '+target.path);continue
  relative=unquote(target.path.removeprefix('/Staz1/'))
  path=ROOT/relative
  if path.is_dir():path=path/'index.html';relative=str(path.relative_to(ROOT)).replace('\\','/')
  if not path.exists():fail(file,'missing target '+ref);continue
  checked+=1
  if target.fragment and path.suffix=='.html':
   doc=parsed.get(relative) or Page(path.read_text(encoding='utf-8'))
   if unquote(target.fragment) not in doc.ids:fail(file,'missing fragment '+ref)
   fragments+=1
  version=parse_qs(target.query).get('v',[''])[0]
  if re.fullmatch(r'[a-f0-9]{12}',version):
   actual=hashlib.sha256(path.read_bytes()).hexdigest()[:12]
   if actual!=version:fail(file,'outdated cache hash '+ref)
   hashes+=1
 for node in page.schema:
  if node.get('@type')=='FAQPage':
   for question in node['mainEntity']:
    if question['name'] not in source or question['acceptedAnswer']['text'] not in source:fail(file,'FAQ schema differs from visible HTML')
  if node.get('@type')=='Product':
   if node.get('offers') or node.get('aggregateRating'):fail(file,'unverified offer/review data')
   for prop in node.get('additionalProperty',[]):
    if html.escape(prop['value'],quote=False) not in source and prop['value'] not in source:fail(file,'product fact absent from HTML '+prop['name'])
  if node.get('@type')=='ItemList':
   if node['numberOfItems']!=len(node['itemListElement']):fail(file,'incorrect item count')
   for item in node['itemListElement']:
    if item['url'].rsplit('/',1)[-1] not in source:fail(file,'catalog schema links to absent game')
for path in (ROOT/'assets/topics').glob('*.svg'):ElementTree.parse(path)
if parsed['kontakt.html'].forms!=1:fail('kontakt.html','expected one contact form')
if parsed['test-formularzy/kontakt-podglad.html'].forms!=1:fail('test-formularzy/kontakt-podglad.html','expected one contact form')
required=re.findall(r'<(?:input|textarea)[^>]*\brequired\b',sources['kontakt.html'])
if len(required)!=3:fail('kontakt.html','expected only name/email/message to be required')
home=sources['index.html']
if home.index('<h1')>home.index('<h2'):fail('index.html','H1 should precede secondary headings')
report={'mainPages':len(main),'alternatives':len(extra),'localTargets':checked,'fragments':fragments,'assetHashes':hashes,'topicIllustrations':10,'errors':errors}
(ROOT/'artifacts').mkdir(exist_ok=True)
(ROOT/'artifacts/AUDIT_V60.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
sys.exit(bool(errors))
