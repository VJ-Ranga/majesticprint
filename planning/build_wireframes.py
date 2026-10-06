"""Generate offline, linked design wireframes from the reviewed page registry."""
from pathlib import Path
import html,json,re
BASE=Path(__file__).resolve().parent
OUT=BASE/'wireframes'; OUT.mkdir(exist_ok=True)
DATA=json.loads((BASE/'sitemap.json').read_text())
E=html.escape
NODES=[]
def walk(n):
    NODES.append(n)
    for c in n.get('children',[]):walk(c)
walk(DATA['root'])
def slug(n):
    p=n['path']
    return (p.strip('/').split('/')[-1] or 'home') if p.startswith('/') and '{' not in p and '?' not in p else re.sub('[^a-z0-9]+','-',n['name'].lower()).strip('-')
PAGES={slug(n):n for n in NODES}
def link(s,label=None,cls=''):
    return f'<a class="{cls}" href="{s}.html">{E(label or PAGES.get(s,{}).get("name",s))}</a>'
def slot(text,cls=''):
    return f'<div class="wf-slot {cls}"><span>{E(text)}</span><small>Approved image / content to supply</small></div>'
def note(text):return '<aside class="annotation">'+E(text)+'</aside>'
def field(label,options=None,kind='text'):
    ident='field-'+re.sub('[^a-z0-9]+','-',label.lower()).strip('-')
    control=(f'<select id="{ident}"><option>Choose an option</option>'+''.join('<option>'+E(o)+'</option>' for o in options)+'</select>') if options else (f'<textarea id="{ident}" rows="3" placeholder="Wireframe example only"></textarea>' if kind=='textarea' else f'<input id="{ident}" type="{kind}" placeholder="Wireframe example only">')
    return '<label class="wf-field" for="'+ident+'">'+E(label)+control+'</label>'
def section(title,body,tag='section'):
    return f'<{tag} class="wf-section"><h2>{E(title)}</h2>{body}</{tag}>'
def cards(items):
    return '<div class="wf-cards">'+''.join('<article class="wf-card">'+slot(label)+'<h3>'+E(label)+'</h3>'+link(s,'View wireframe →')+'</article>' for s,label in items)+'</div>'
PRODUCTS=[('standard-product','Business cards'),('standard-product','Brochures & flyers'),('standard-product','Labels & tags'),('standard-product','Calendars & notebooks'),('personalised-product','Personalised mugs'),('personalised-product','Printed T-shirts')]
CATS=DATA['root']['children'][0]['children'][:7]
CATEGORY_ITEMS={
'business-stationery':['Business cards','Letterheads','Envelopes'],
'marketing-publications':['Brochures & flyers','Booklets','Calendars'],
'labels-tags':['Product labels','Hang tags','Stickers'],
'packaging':['Product boxes','Paper bags','Sleeves'],
'gifts-apparel':['Personalised mugs','Printed T-shirts','Gift items'],
'weddings-events':['Invitations','Event stationery','Welcome signs'],
'signs-displays':['Banners','Display graphics','Signage']
}
SOL=DATA['root']['children'][1]['children']
HELP=next(n for n in NODES if n['name']=='Help')['children']
def actions(items):return '<div class="actions">'+''.join(link(s,l,'btn btn-primary' if i==0 else 'btn btn-secondary') for i,(s,l) in enumerate(items))+'</div>'
def summary():
    return '<aside class="wf-summary"><h2>Order summary</h2><p>Example configuration<br>Business cards · stock / finish · quantity</p><dl><dt>Products</dt><dd>Confirmed rate required</dd><dt>Delivery / tax</dt><dd>Calculated after confirmation</dd><dt>Total</dt><dd>Not priced in this wireframe</dd></dl>'+note('No invented prices. Final totals must follow approved quantity tiers, fees and tax rules.')+'</aside>'
def steps(labels):return '<ol class="wf-steps">'+''.join('<li>'+E(l)+'</li>' for l in labels)+'</ol>'
def faqs(items):return ''.join('<details class="wf-faq"><summary>'+E(q)+'</summary><p>'+E(a)+'</p></details>' for q,a in items)
def optionsbar():
    return '<div class="wf-filters">'+field('Product family',['Business stationery','Marketing','Gifts'])+field('Order route',['Buy configured product','Custom quote'])+field('Sort',['Relevant','Name'])+'</div>'

def product(gift=False):
    title='Personalised mug' if gift else 'Business cards'
    controls=(field('Item colour',['Approved colour range'])+field('Personalisation type',['Photo','Text','Logo'])+field('Personalisation text')+slot('Illustrative personalisation preview')) if gift else field('Size',['Approved size range'])+field('Paper / stock',['Approved paper range'])+field('Print sides',['One side','Two sides'])+field('Finish',['Approved finish range'])
    controls+=field('Quantity',kind='number')+field('Artwork route',['Supply artwork','Request design help'])
    main='<div class="wf-two"><div>'+slot(title+' main photograph','wf-large')+'<div class="wf-thumbs">'+slot('Front view')+slot('Detail')+slot('In use')+'</div></div><div><h2>'+title+'</h2><p>'+('A personal gift or a branded item.' if gift else 'A clear introduction to your business.')+'</p>'+note('Representative layout. Every size, stock, finish and quantity requires catalogue approval.')+controls+note('Artwork upload area — disabled in this wireframe. Preview is illustrative; it is not an approved print proof.')+section('Price & fulfilment','<p>Quantity price basis, order total and production estimate will appear here once confirmed. Delivery is shown separately.</p>')+actions([('cart','View example cart'),('product-required-input','Required-input state'),('request-a-quote','Custom / bulk quote')])+'</div></div>'
    main+=section('Review your choices',steps(['Specification summary','Personalisation / artwork version','Quantity and agreed total','Proof requirement and next action']))
    main+=section('Specifications & artwork', '<div class="wf-cards"><article class="wf-card"><h3>Dimensions & materials</h3><p>Approved product specification table.</p></article><article class="wf-card"><h3>Artwork template</h3><p>Approved bleed, safe area and file format.</p>'+link('artwork','Artwork preparation')+'</article><article class="wf-card"><h3>Proof responsibility</h3><p>Identify which version needs explicit approval.</p>'+link('artwork-proof-policy','Proof policy layout')+'</article></div>')
    main+=section('Questions about this product',faqs([('Can you help with artwork?','Show the approved design service, fee and revision scope.'),('When will it be ready?','Explain production after payment and required approval; show confirmed transit separately.')]))
    return main+section('Related products',cards(PRODUCTS[:3]))

INFO={
'about':['Use the guide statement: One partner. Every printing solution.','Reserve a verified company story and dated milestones; no invented founding year.','Link all 12 guide families, grouped around Print / Pack / Promote.','Reserve team, facility and equipment photographs with truthful captions.','Only publish documented awards and authorised reviews.','Let customers explore actual work or contact the relevant team.'],
'how-to-order':['Product → specification → artwork → reviewed order → payment.','Brief → quote → accepted scope → payment / proof requirements.','Production starts only after the applicable payment and artwork gates.','Provide next steps when the customer is unsure.'],
'artwork':['Select the relevant product or production family.','Place approved templates and dimensions here; do not invent bleed requirements.','Explain approved formats, upload size limits and checks. Upload controls are absent from this wireframe.','Offer design help when suitable artwork is unavailable.'],
'design-help':['Capture intended use, dimensions, brand assets and desired outcome.','Place the confirmed design fee and included revision scope here.','Explain the difference between an illustration and an approved production proof.','Link a design request to a quote or the relevant order.'],
'materials-finishes':['Use a comparison table for approved stocks, substrates and finishes.','Explain suitability for indoor / outdoor use and intended applications.','Reserve close-up photographs of actual material and print detail.','Link material choices to the relevant product or quote.'],
'delivery':['Place confirmed collection address, opening hours and instructions here.','Explain verified courier regions, costs and destination restrictions.','Separate oversize freight and installation from ordinary parcels.','Show production duration and transit duration separately; no invented speed promise.'],
'payments':['Show only the gateway and payment methods approved for launch.','Explain pending, failure, cancellation and recoverable retry.','Reserve the confirmed receipt and refund process.','Offer an order reference and appropriate contact route.'],
'faq':['Group questions by product selection, artwork, payment and fulfilment.','Link answers to detailed preparation and ordering pages.','Offer contact or a custom quote when an answer does not resolve the question.'],
'privacy-policy':['Effective date and policy owner to be supplied.','Wireframe slots for collection purposes, order/artwork data, processors, retention and customer choices.','Explain confirmed responsibilities for account and artwork access.','Provide the approved privacy contact and related terms.'],
'terms':['Effective date and policy owner to be supplied.','Wireframe slots for order acceptance, specifications, pricing, payment and fulfilment terms.','Explain approved customer and production responsibilities.','Provide a support contact and related policies.'],
'returns-cancellations':['Effective date and policy owner to be supplied.','Wireframe slots for customised items, defects, cancellation stage and request process.','Place confirmed eligibility, evidence requirements and remedies here.','Provide a contact route and related order terms.'],
'artwork-proof-policy':['Effective date and policy owner to be supplied.','Wireframe slots for file ownership, review, versioning and explicit approval.','Clarify who checks spelling, dimensions, colours and content, using approved policy.','Provide revision/support routes and related terms.']}

def info(n,key):
    texts=INFO.get(key,[])
    body=''
    for i,title in enumerate(n['sections']):
        text=texts[i] if i<len(texts) else 'Reserve approved content for this section.'
        detail='<p>'+E(text)+'</p>'
        if key=='about' and i==0: detail='<h3>One partner. Every printing solution.</h3>'+detail
        if key=='about' and i==2:detail+=cards([(slug(s),s['name']) for s in SOL])
        elif any(t in title.lower() for t in ['image','facility','story','award']):detail+=slot(title)
        elif key=='materials-finishes' and i==0:detail+='<table><caption>Approved material comparison layout</caption><thead><tr><th>Material</th><th>Suitable use</th><th>Limitations</th></tr></thead><tbody><tr><td>Approved stock</td><td>Client-confirmed application</td><td>Client-confirmed constraints</td></tr></tbody></table>'
        elif key=='faq' and i==0:detail+=faqs([('How do I choose a product?','Browse by intended use or request help choosing.'),('Do I need artwork?','Use the product-specific artwork guidance or request design help.'),('How do I follow an order?','The planned status page separates payment, artwork, production and dispatch.')])
        body+=section(title,detail)
    return body+actions([('help','Explore help'),('contact','Contact page')])

def body(n,key):
    if key in ('standard-product','personalised-product'):return product(key=='personalised-product')
    if n['kind']=='Category' or key=='shop':
        return section(n['sections'][0],'<p>'+E(n['purpose'])+'</p>')+(section('Product collections',cards([(slug(c),c['name']) for c in CATS])) if key=='shop' else section('Find the right product',optionsbar()))+section('Product grid',cards(PRODUCTS if key=='shop' else [('personalised-product' if key=='gifts-apparel' else 'request-a-quote' if key in ['packaging','signs-displays'] else 'standard-product',label) for label in CATEGORY_ITEMS[key]]))+section('Materials and size comparison',slot('Comparison of approved product specifications'))+section('Artwork & delivery help',actions([('artwork','Prepare artwork'),('delivery','Delivery information')]))+section('Something custom?',actions([('request-a-quote','Request a custom or bulk quote')]))
    if key=='solutions':return section('Choose by the result you need','<p>All 12 service families from the brand guide.</p>'+cards([(slug(s),s['name']) for s in SOL]))+section('Need help choosing?',actions([('request-a-quote','Plan your project')]))
    if n['kind']=='Solution':
        inp=n['inputs'].split(' → ')
        return section(n['sections'][0],'<p>'+E(n['purpose'])+'</p>'+slot(n['name']+' actual output','wf-large'))+section(n['sections'][2],'<p>'+E(n['purpose'])+'</p>'+slot('Approved application examples'))+section(n['sections'][3],'<p>Show approved substrates, size ranges, finishing options and restrictions. Confirm availability before publishing.</p>')+section(n['sections'][4],cards(PRODUCTS[:2]))+section(n['sections'][5],slot('Customer-approved '+n['name']+' project')+steps(['Agree the requirement','Confirm material and production scope','Review artwork / proof','Produce and fulfil']))+section(n['sections'][6],faqs([('What details should I prepare?',n['inputs']),('Can you help me choose?','Include an “I’m not sure” option in the service-specific brief.')]))+section(n['sections'][7],note('Family-preselected quote layout; field list tailored to this capability.')+''.join(field(x.capitalize(),kind='textarea' if 'artwork' in x or 'drawing' in x else 'text') for x in inp)+actions([('request-a-quote','Continue to quote wireframe')]))
    if key=='help':return section('What do you need help with?',cards([(slug(h),h['name']) for h in HELP]))+section('Still unsure?',actions([('contact','Contact'),('request-a-quote','Custom quote')]))
    if key=='our-work':return section('Selected work','<p>Real projects will show the brief, materials and finished result.</p>')+section('Browse by service',field('Project family',['Print','Packaging','Signage','Gifts']))+section('Project grid',cards([('project-detail','Commercial printing project'),('project-detail','Packaging project'),('project-detail','Branding project')]))+actions([('request-a-quote','Discuss a similar project')])
    if key=='project-detail':return ''.join(section(t,slot(t) if i in [1,3] else '<p>Customer-approved project information to supply. This layout represents a case study, not a completed client job.</p>') for i,t in enumerate(n['sections']))+actions([('request-a-quote','Discuss similar work')])
    if key=='contact':return section('What can we help you with?',actions([('request-a-quote','New project'),('track-order','Existing order'),('design-help','Artwork help')]))+section('Visit or reach us','<div class="wf-two"><div><h3>Contact information</h3><p>95, Negombo Road, Pannala — legacy address, reconfirm before launch.</p><p>Phone, email and opening hours to verify.</p></div>'+slot('On-demand location map — no external map loaded')+'</div>')+section('Enquiry form layout',field('Reason',['Product question','Order help','General enquiry'])+field('Your name')+field('Email',kind='email')+field('Message',kind='textarea')+note('No data is submitted or saved. The action below only opens an example receipt.')+actions([('enquiry-receipt','View enquiry receipt state')]))+section('Help alternatives',actions([('faq','FAQ'),('how-to-order','How to order')]))
    if key=='request-a-quote':return section('1. Choose a service',field('Service family',[s['name'] for s in SOL]+['Help me choose'])+note('Each solution page shows its own relevant brief inputs.'))+section('2. Describe the project',field('Intended use',kind='textarea')+field('Dimensions / material — or I’m not sure')+field('Quantity',kind='number')+field('Desired date',kind='date')+field('Destination / installation'))+section('3. Artwork & references',slot('Artwork / reference attachment area — disabled')+field('Design help needed',['Yes','No','Please advise']))+section('4. Contact preference',field('Name')+field('Email',kind='email')+field('Preferred contact method',['Email','Phone']))+section('5. Review the brief',steps(['Service / application','Specification, quantity and destination','Artwork or design request','Contact and privacy acknowledgement'])+note('No submission. Example receipt and required-input states show where feedback belongs.')+actions([('quote-submission','View brief receipt state'),('quote-required-input','View incomplete-brief state'),('privacy-policy','Privacy layout')]))
    if key=='quote-result-acceptance':return section('Quote reference & status',note('DEMO-QUOTE · example only · awaiting review'))+section('Versioned specification','<p>Requested service, approved dimensions/material, quantity, artwork version and fulfilment scope.</p>')+section('Price, expiry & exclusions','<p>Confirmed commercial terms appear here. No sample prices or invented validity dates.</p>')+section('Review your quote',actions([('quote-accepted','View acceptance receipt'),('quote-revision','View revision request'),('checkout','Payable-order layout')]))
    if key=='search':return section('Search products & solutions',field('Search query')+actions([('search','Example results'),('search-empty','No-results state')]))+section('Relevant results',cards(PRODUCTS[:3]+[(slug(SOL[10]),'Packaging & branding')]))
    if key=='cart':return '<div class="wf-two">'+section('Your configured items','<div class="wf-card"><h3>Business cards — example line</h3><p>Size · stock · finish · quantity</p><p>Artwork: awaiting approved file / version</p>'+actions([('standard-product','Edit configuration'),('cart-empty','View empty-cart state')])+'</div>')+summary()+'</div>'+actions([('checkout','View checkout'),('shop','Continue browsing')])
    if key=='checkout':return '<div class="wf-two"><div>'+section('Guest contact details',field('Full name')+field('Email',kind='email')+field('Phone',kind='tel'))+section('Destination',field('Address',kind='textarea')+field('Town / postcode'))+section('Fulfilment',field('Delivery method',['Eligible courier service — rates pending','Pickup — details pending'])+note('Oversize / installation work follows its accepted quote.'))+section('Payment method',slot('Approved gateway placement — provider unconfirmed')+note('This wireframe collects no card information and takes no payment.'))+section('Review & continue',actions([('payment-result','View pending result'),('checkout-required-input','Required-field feedback')]))+'</div>'+summary()+'</div>'
    if key=='payment-result':return section('Payment state',note('Example state: PENDING. This is a wireframe, not a payment confirmation.')+'<p>Order reference DEMO-ORDER. Show a clear status without releasing work prematurely.</p>'+actions([('payment-success','Success layout'),('payment-failed','Failure layout'),('payment-cancelled','Cancelled layout')]))+section('Next steps',steps(['Verify payment','Complete required artwork / proof approval','Track production and dispatch']))+actions([('track-order','Track example order'),('contact','Support')])
    if key=='my-account':return section('Sign-in area',field('Email',kind='email')+slot('Sign-in / password controls — no authentication in wireframe'))+section('Account overview','<div class="wf-cards">'+''.join('<article class="wf-card"><h3>'+label+'</h3>'+link(s,'Open example →')+'</article>' for s,label in [('track-order','Orders'),('quote-result-acceptance','Quotes'),('proof-review','Proof actions')])+'</div>')+section('Reorder',note('Recheck availability, price and artwork before repeating a previous specification.')+actions([('standard-product','Review previous configuration')]))
    if key=='track-order':return section('Authorised lookup',field('Order reference')+field('Order email',kind='email')+note('Example order only. Final status access must be authorised.'))+section('Your order at a glance','<dl class="wf-status"><dt>Payment</dt><dd>Pending — example</dd><dt>Artwork</dt><dd>Proof review required — example</dd><dt>Production</dt><dd>Not released</dd><dt>Dispatch</dt><dd>Not dispatched</dd></dl>')+section('Next customer action',actions([('proof-review','Review example proof'),('payment-result','Payment status')]))+section('Need assistance?',actions([('contact','Contact with reference')]))
    if key=='proof-review':return section('Proof version',note('DEMO-ORDER · artwork version V1 · example only')+slot('Proof document preview — no customer file','wf-large'))+section('Review carefully',steps(['Text and spelling','Size, layout and content','Material / print scope','Current artwork version'])+field('Comments',kind='textarea'))+section('Your decision',note('The production implementation must record explicit approval of the named version. These links only open wireframe states.')+actions([('proof-approved','Approval receipt layout'),('proof-revision','Request changes layout')]))
    if n['kind']=='Group':return section('Choose a page',cards([(slug(c),c['name']) for c in n['children']]))
    return info(n,key)

EXTRAS={
'cart-empty':('Empty cart','Your cart is empty. Place the recovery action near the empty-state message.','shop','Browse products'),
'product-required-input':('Product — required input','Inline error area: choose the required specification and quantity. Preserve choices and move focus to the first incomplete field.','standard-product','Return to product'),
'quote-required-input':('Quote — incomplete brief','Error summary links to missing contact and service information. Unknown specifications are allowed with “Help me choose”.','request-a-quote','Return to brief'),
'quote-submission':('Brief received — example','DEMO-BRIEF. Show submitted specification, reference and next step. Confirm a response expectation only after the team approves it.','quote-result-acceptance','View quote layout'),
'quote-accepted':('Quote acceptance receipt','Record accepted version, scope, commercial terms and customer action. This page creates no acceptance or order.','checkout','Payable-order layout'),
'quote-revision':('Quote revision request','Show versioned quote summary and a comments area. Preserve the previous quote until a reviewed revision exists.','request-a-quote','Brief layout'),
'checkout-required-input':('Checkout — required fields','Error summary and inline contact/address errors. Preserve the reviewed configuration. Payment does not proceed with unresolved required information.','checkout','Return to checkout'),
'payment-success':('Payment success — example','Display success only after verified payment. Receipt, authorised reference and artwork action belong here. No payment has occurred.','track-order','View order status'),
'payment-failed':('Payment failed — example','Show recoverable failure, preserve the order, and offer a safe retry. Final retry must prevent duplicate payment or production release.','checkout','Retry layout'),
'payment-cancelled':('Payment cancelled — example','Explain cancellation and preserve the unpaid order for review or retry. Do not show it as paid.','cart','Review order'),
'proof-approved':('Proof approval receipt','Record the explicit approval of V1 and show the next production gate. This example records no approval.','track-order','View order status'),
'proof-revision':('Proof — changes requested','Comments and a new version will appear here. Production remains blocked until required approval is complete.','proof-review','Return to proof'),
'enquiry-receipt':('Enquiry receipt — example','Show a reference and the submitted enquiry summary. This is a visual receipt; no message was sent.','contact','Return to contact'),
'search-empty':('Search — no results','Repeat the query, suggest a broader product name, and offer service browsing or help choosing.','solutions','Browse solutions'),
'not-found':('Page not found','Clear recovery paths for an outdated or incorrect link. Include search, product browsing and support.','shop','Browse products')}

def shell(title,content,key):
    nav=''.join(link(s) for s in ['shop','solutions','our-work','help','about','contact'])+link('request-a-quote','Request a quote','btn btn-primary')
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{E(title)} — Majestic Print wireframe</title><link rel="stylesheet" href="../styles.css?v=wireframes-2"><link rel="stylesheet" href="wireframes.css?v=2"></head><body><a class="skip" href="#main">Skip to content</a><div class="review-bar"><div class="wrap"><strong>WIREFRAME · {E(title)}</strong><div class="review-controls"><a href="index.html">All pages</a><a href="../sitemap.html">Sitemap</a><label class="toggle"><input id="notes" type="checkbox" checked> Show design notes</label></div></div></div><header class="site-header"><div class="wrap header-row"><a class="brand-ref" href="home.html"><img src="../assets/header-logo-reference.svg" alt="Majestic Print Solutions" width="90" height="90"></a><nav class="header-nav" aria-label="Primary">{nav}</nav><details class="mobile-nav"><summary>Menu</summary><nav aria-label="Mobile primary">{nav}</nav></details></div><div class="wrap wf-utilities">{link('search')}{link('my-account')}{link('cart')}{link('track-order')}</div></header><main id="main" class="wrap review-main"><nav class="wf-breadcrumb" aria-label="Breadcrumb">{link('home','Home')} / {link('index','Wireframes')} / <span>{E(title)}</span></nav><p class="eyebrow">Print. Pack. Promote.</p><h1>{E(title)}</h1>{note('Layout review only. Brand colours applied; Arial font fallback. Representative content and controls show structure; no rates, orders, uploads, authentication or payments are live.')} {content}</main><footer class="footer"><div class="wrap footer-grid"><div><h3>Majestic Print Solutions</h3><p>Print. Pack. Promote.</p><p>Verified contacts and opening hours to supply.</p></div><div><h3>Explore</h3>{link('shop')}{link('solutions')}{link('our-work')}{link('about')}</div><div><h3>Help</h3>{link('how-to-order')}{link('artwork')}{link('delivery')}{link('contact')}</div><div><h3>Policies</h3>{link('privacy-policy')}{link('terms')}{link('returns-cancellations')}{link('artwork-proof-policy')}</div></div></footer><script src="wireframes.js"></script></body></html>'''
for key,n in PAGES.items():
    if key=='home':continue
    (OUT/(key+'.html')).write_text(shell(n['name'],body(n,key),key))
for key,(title,text,target,label) in EXTRAS.items():
    content=section('Example feedback state',note('STATIC EXAMPLE — NO CUSTOMER ACTION HAS OCCURRED')+'<div class="wf-feedback" role="status"><h2>'+E(title)+'</h2><p>'+E(text)+'</p></div>'+actions([(target,label)]))
    if key in ['proof-revision','quote-revision']:content+=section('Change request layout',field('Requested changes',kind='textarea'))
    (OUT/(key+'.html')).write_text(shell(title,content,key))
# Preserve the original review homepage; create a linked copy for the full wireframe set.
home=(BASE/'homepage-wireframe.html').read_text().replace('href="styles.css"','href="../styles.css?v=wireframes-2"').replace('src="assets/','src="../assets/').replace('</head>','<link rel="stylesheet" href="wireframes.css?v=2"></head>')
home=home.replace('href="styles.css?v=wireframes-2"','href="../styles.css?v=wireframes-2"')
home=home.replace('href="sitemap.html"','href="../sitemap.html"').replace('href="wireframes/index.html"','href="index.html"')
home=re.sub(r'href="sitemap.html#([^"]+)"',lambda m:'href="'+m.group(1)+'.html"',home)
for anchor,key in [('products','shop'),('solutions','solutions'),('work','our-work'),('ordering','help'),('about','about'),('contact','contact'),('project','request-a-quote')]:home=home.replace('href="#'+anchor+'"','href="'+key+'.html"')
home=home.replace('Search — planned','<a href="search.html">Search</a>').replace('Account — planned','<a href="my-account.html">Account</a>').replace('Cart — planned','<a href="cart.html">Cart</a>')
(OUT/'home.html').write_text(home)
index=section('Main page tree',''.join('<details class="wf-directory" open><summary>'+E(n['name'])+'</summary>'+link(slug(n),'Open '+n['name']+' →')+'<ul>'+''.join('<li>'+link(slug(c))+'</li>' for c in n.get('children',[]))+'</ul></details>' for n in DATA['root']['children']))+section('Homepage',actions([('home','Open homepage wireframe')]))+section('Example feedback states','<div class="wf-state-links">'+''.join(link(k,v[0]) for k,v in EXTRAS.items())+'</div>')
(OUT/'index.html').write_text(shell('All wireframe pages',index,'index'))
manifest={'scope':'Linked static wireframes, not a functional prototype','registry_nodes':len(NODES),'registry_pages':len(PAGES),'extra_state_pages':len(EXTRAS),'pages':[{'file':k+'.html','name':n['name'],'planned_route':n['path'],'section_order':n['sections']} for k,n in PAGES.items()]+[{'file':k+'.html','name':v[0],'state':True} for k,v in EXTRAS.items()]+[{'file':'index.html','name':'All wireframe pages'}]}
(OUT/'coverage.json').write_text(json.dumps(manifest,indent=2))
print('Generated',len(manifest['pages']),'wireframe pages:',len(PAGES),'registry pages/groups +',len(EXTRAS),'feedback states + index.')
