// Pricing.jsx — three-tier pricing page mirroring Wispr Flow's structure,
// adapted to the Lingua brand. Sections: hero with billing toggle,
// three tier cards, plans-and-features comparison table, savings calculator,
// student-discount band, FAQ accordion.
//
// Prices match the source: Pro = $15/mo monthly, $12/mo billed annually.

function PricingPage() {
  const [, , t] = window.i18n.useLang();
  const [billing, setBilling] = React.useState('annual'); // 'monthly' | 'annual'

  return (
    <section className="lg-pricing">
      <PricingHero billing={billing} setBilling={setBilling} t={t} />
      <PricingTiers billing={billing} t={t} />
      <PricingCalc billing={billing} t={t} />
      <PricingStudent t={t} />
      <PricingTable t={t} />
      <PricingFAQ t={t} />
    </section>
  );
}

function PricingHero({ billing, setBilling, t }) {
  return (
    <header className="lg-pricing__hero">
      <p className="lg-pricing__eyebrow">{t('pricing.eyebrow')}</p>
      <h1 className="lg-pricing__h">
        {t('pricing.h.a')}<em className="emphasis">{t('pricing.h.em')}</em>{t('pricing.h.b')}
      </h1>
      <p className="lg-pricing__sub">{t('pricing.sub')}</p>

      <div className="lg-pricing__toggle" role="tablist" aria-label="Billing period">
        <button
          role="tab"
          aria-selected={billing === 'monthly'}
          className={'lg-pricing__toggle-btn' + (billing === 'monthly' ? ' is-on' : '')}
          onClick={() => setBilling('monthly')}
        >
          {t('pricing.toggle.monthly')}
        </button>
        <button
          role="tab"
          aria-selected={billing === 'annual'}
          className={'lg-pricing__toggle-btn' + (billing === 'annual' ? ' is-on' : '')}
          onClick={() => setBilling('annual')}
        >
          {t('pricing.toggle.annual')}
          <span className="lg-pricing__toggle-pill">{t('pricing.toggle.discount')}</span>
        </button>
      </div>
    </header>
  );
}

function PricingTiers({ billing, t }) {
  const proPrice = billing === 'annual'
    ? t('pricing.tier.pro.priceAnnual')
    : t('pricing.tier.pro.priceMonthly');
  const proPriceOld = billing === 'annual'
    ? t('pricing.tier.pro.priceAnnualOld')
    : t('pricing.tier.pro.priceMonthlyOld');
  const proUnit = billing === 'annual'
    ? t('pricing.tier.pro.priceUnitAnnual')
    : t('pricing.tier.pro.priceUnit');
  const proSub = billing === 'annual'
    ? t('pricing.tier.pro.priceSub.annual')
    : t('pricing.tier.pro.priceSub.monthly');

  return (
    <div className="lg-pricing__tiers">
      <article className="lg-tier">
        <p className="lg-tier__tag">{t('pricing.tier.basic.tag')}</p>
        <h2 className="lg-tier__name">{t('pricing.tier.basic.name')}</h2>
        <div className="lg-tier__price">
          <span className="lg-tier__price-big">{t('pricing.tier.basic.price')}</span>
          <span className="lg-tier__price-sub">{t('pricing.tier.basic.priceSub')}</span>
        </div>
        <p className="lg-tier__lede">{t('pricing.tier.basic.lede')}</p>
        <a className="lg-btn lg-btn--ghost lg-tier__cta" href="#download" onClick={(e)=>{e.preventDefault();alert('Download flow → wire to wisprflow.onelink equivalent')}}>
          {t('pricing.tier.basic.cta')}
        </a>
        <p className="lg-tier__note">{t('pricing.tier.basic.note')}</p>
        <ul className="lg-tier__feats">
          {[1,2,3,4,5,6,7].map(n => (
            <li key={n}><Check />{t(`pricing.tier.basic.f.${n}`)}</li>
          ))}
        </ul>
      </article>

      <article className="lg-tier lg-tier--pop">
        <span className="lg-tier__pop">{t('pricing.tier.pro.popular')}</span>
        <p className="lg-tier__tag">{t('pricing.tier.pro.tag')}</p>
        <h2 className="lg-tier__name">{t('pricing.tier.pro.name')}</h2>
        <div className="lg-tier__price">
          <span className="lg-tier__price-old">{proPriceOld}</span>
          <span className="lg-tier__price-big">{proPrice}</span>
          <span className="lg-tier__price-unit">{proUnit}</span>
          <span className="lg-tier__price-sub">{proSub}</span>
        </div>
        <div className="lg-tier__beta">
          <span className="lg-tier__beta-stamp" aria-hidden="true">
            <span className="lg-tier__beta-stamp-pct">−50%</span>
            <span className="lg-tier__beta-stamp-lbl">{t('pricing.tier.pro.betaStamp')}</span>
          </span>
          <span className="lg-tier__beta-copy">
            <strong className="lg-tier__beta-headline">{t('pricing.tier.pro.betaHeadline')}</strong>
            <span className="lg-tier__beta-sub">{t('pricing.tier.pro.betaBadge')}</span>
          </span>
        </div>
        <p className="lg-tier__lede">{t('pricing.tier.pro.lede')}</p>
        <a className="lg-btn lg-btn--blue lg-tier__cta" href="#download" onClick={(e)=>{e.preventDefault();alert('Download flow → wire to wisprflow.onelink equivalent')}}>
          {t('pricing.tier.pro.cta')}
        </a>
        <ul className="lg-tier__feats">
          {[1,2,3,4,5].map(n => (
            <li key={n}><Check />{t(`pricing.tier.pro.f.${n}`)}</li>
          ))}
        </ul>
      </article>

      <article className="lg-tier">
        <p className="lg-tier__tag">{t('pricing.tier.ent.tag')}</p>
        <h2 className="lg-tier__name">{t('pricing.tier.ent.name')}</h2>
        <div className="lg-tier__price">
          <span className="lg-tier__price-big">{t('pricing.tier.ent.price')}</span>
          <span className="lg-tier__price-sub">{t('pricing.tier.ent.priceSub')}</span>
        </div>
        <p className="lg-tier__lede">{t('pricing.tier.ent.lede')}</p>
        <EnterpriseCTA label={t('pricing.tier.ent.cta')} />
        <ul className="lg-tier__feats">
          {[1,2,3,4,5,6,7,8].map(n => (
            <li key={n}><Check />{t(`pricing.tier.ent.f.${n}`)}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function EnterpriseCTA({ label }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <a className="lg-btn lg-btn--primary lg-tier__cta" href="#sales" onClick={(e)=>{e.preventDefault(); setOpen(true);}}>
        {label}
      </a>
      {open && window.ContactModal && React.createElement(window.ContactModal, {
        topic: 'sales',
        onClose: () => setOpen(false),
      })}
    </React.Fragment>
  );
}

function Check() {
  return (
    <svg className="lg-tier__check" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2.6 7.4 L5.6 10.4 L11.4 3.8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PricingStudent({ t }) {
  return (
    <aside className="lg-pricing__student">
      <div className="lg-pricing__student-copy">
        <p className="lg-pricing__student-eyebrow">{t('pricing.student.eyebrow')}</p>
        <h2 className="lg-pricing__student-h">{t('pricing.student.h')}</h2>
        <p className="lg-pricing__student-b">{t('pricing.student.b')}</p>
        <p className="lg-pricing__student-fine">{t('pricing.student.fine')}</p>
      </div>
      <a className="lg-btn lg-btn--blue lg-pricing__student-cta" href="#students" onClick={(e)=>e.preventDefault()}>
        {t('pricing.student.cta')}
      </a>
    </aside>
  );
}

function PricingTable({ t }) {
  // Cell types: true | false | string
  const Y = true, N = false;
  const sections = [
    { h: t('pricing.compare.sec.devices'), rows: [
      { l: t('pricing.compare.row.mac'),     c: [Y, Y, Y] },
      { l: t('pricing.compare.row.win'),     c: [Y, Y, Y] },
      { l: t('pricing.compare.row.ios'),     c: [Y, Y, Y] },
      { l: t('pricing.compare.row.android'), c: [Y, Y, Y] },
    ]},
    { h: t('pricing.compare.sec.typing'), rows: [
      { l: t('pricing.compare.row.dict'),     c: [Y, Y, Y] },
      { l: t('pricing.compare.row.words'),    c: [
        t('pricing.compare.cell.words.basic'),
        t('pricing.compare.cell.unlimited'),
        t('pricing.compare.cell.unlimited'),
      ]},
      { l: t('pricing.compare.row.langs'),    c: [Y, Y, Y] },
      { l: t('pricing.compare.row.priority'), c: [N, Y, Y] },
      { l: t('pricing.compare.row.early'),    c: [N, Y, Y] },
    ]},
    { h: t('pricing.compare.sec.team'), rows: [
      { l: t('pricing.compare.row.billing'),    c: [N, Y, Y] },
      { l: t('pricing.compare.row.shared'),     c: [N, Y, Y] },
      { l: t('pricing.compare.row.support'),    c: [
        t('pricing.compare.cell.support.basic'),
        t('pricing.compare.cell.support.pro'),
        t('pricing.compare.cell.support.ent'),
      ]},
      { l: t('pricing.compare.row.dashboards'), c: [
        N,
        t('pricing.compare.cell.dash.pro'),
        t('pricing.compare.cell.dash.ent'),
      ]},
    ]},
    { h: t('pricing.compare.sec.security'), rows: [
      { l: t('pricing.compare.row.privacy'),  c: [Y, Y, t('pricing.compare.cell.enforced')] },
      { l: t('pricing.compare.row.iso'),      c: [N, N, Y] },
      { l: t('pricing.compare.row.sso'),      c: [N, N, Y] },
      { l: t('pricing.compare.row.adminctl'), c: [N, Y, Y] },
      { l: t('pricing.compare.row.msa'),      c: [N, Y, Y] },
      { l: t('pricing.compare.row.hipaa'),    c: [Y, Y, t('pricing.compare.cell.enforced')] },
    ]},
  ];

  const renderCell = (v) => {
    if (v === true)  return <span className="lg-ptable__yes" aria-label="yes"><Check /></span>;
    if (v === false) return <span className="lg-ptable__no" aria-label="—">—</span>;
    return <span className="lg-ptable__val">{v}</span>;
  };

  return (
    <section className="lg-ptable">
      <h2 className="lg-ptable__h">{t('pricing.compare.h')}</h2>
      <div className="lg-ptable__wrap">
        <table className="lg-ptable__t">
          <thead>
            <tr>
              <th />
              <th>{t('pricing.compare.col.basic')}</th>
              <th className="lg-ptable__pop-col">{t('pricing.compare.col.pro')}</th>
              <th>{t('pricing.compare.col.ent')}</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((sec, si) => (
              <React.Fragment key={si}>
                <tr className="lg-ptable__sec">
                  <th colSpan="4">{sec.h}</th>
                </tr>
                {sec.rows.map((r, ri) => (
                  <tr key={ri}>
                    <th scope="row">{r.l}</th>
                    <td>{renderCell(r.c[0])}</td>
                    <td className="lg-ptable__pop-col">{renderCell(r.c[1])}</td>
                    <td>{renderCell(r.c[2])}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PricingCalc({ billing, t }) {
  const [hours, setHours] = React.useState(2);
  const [rate, setRate] = React.useState(50);

  // Assumptions: ~40 wpm typing speed; Lingua is ~4× faster.
  const wordsPerDay = Math.round(hours * 60 * 40);
  const daysPerMonth = 20;
  const hoursMonthlyTyping = hours * daysPerMonth;
  const hoursSaved = Math.round(hoursMonthlyTyping * 0.55); // ~55% saved
  const timeValue = hoursSaved * rate;
  const cost = billing === 'annual' ? 9 : 9; // beta price both cycles

  return (
    <section className="lg-calc">
      <h2 className="lg-calc__h">{t('pricing.calc.h')}</h2>
      <div className="lg-calc__grid">
        <div className="lg-calc__inputs">
          <div className="lg-calc__field">
            <label htmlFor="lg-calc-hours" className="lg-calc__lbl">
              {t('pricing.calc.hours')} <strong>{hours}</strong> {t('pricing.calc.hoursUnit')}
            </label>
            <input
              id="lg-calc-hours"
              type="range"
              min="1" max="8" step="1"
              value={hours}
              onChange={(e)=>setHours(Number(e.target.value))}
              className="lg-calc__range"
            />
            <p className="lg-calc__note">
              {t('pricing.calc.wordsNote').replace('{words}', wordsPerDay.toLocaleString())}
            </p>
          </div>
          <div className="lg-calc__field">
            <label htmlFor="lg-calc-rate" className="lg-calc__lbl">{t('pricing.calc.rate')}</label>
            <div className="lg-calc__rate">
              <span>$</span>
              <input
                id="lg-calc-rate"
                type="number"
                min="10" max="500" step="5"
                value={rate}
                onChange={(e)=>setRate(Number(e.target.value) || 0)}
              />
              <span className="lg-calc__rate-unit">{t('pricing.calc.rateUnit')}</span>
            </div>
          </div>
        </div>

        <div className="lg-calc__result">
          <p className="lg-calc__savings-lbl">{t('pricing.calc.savings')}</p>
          <p className="lg-calc__savings-big">${(timeValue - cost).toLocaleString()}<span>/mo</span></p>
          <dl className="lg-calc__break">
            <div><dt>{t('pricing.calc.row.hoursTyping')}</dt><dd>{hoursMonthlyTyping}</dd></div>
            <div><dt>{t('pricing.calc.row.hoursSaved')}</dt><dd>{hoursSaved}</dd></div>
            <div><dt>{t('pricing.calc.row.timeValue')}</dt><dd>${timeValue.toLocaleString()}</dd></div>
            <div><dt>{t('pricing.calc.row.cost')}</dt><dd>${cost}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function PricingFAQ({ t }) {
  const [open, setOpen] = React.useState(0);
  const items = [1,2,3,4,5].map(n => ({
    q: t(`pricing.faq.q${n}`),
    a: t(`pricing.faq.a${n}`),
  }));
  return (
    <section className="lg-pfaq">
      <h2 className="lg-pfaq__h">{t('pricing.faq.h')}</h2>
      <div className="lg-pfaq__list">
        {items.map((it, i) => (
          <details key={i} open={open === i} onClick={(e)=>{e.preventDefault(); setOpen(open === i ? -1 : i);}}>
            <summary>
              <span>{it.q}</span>
              <span className="lg-pfaq__plus" aria-hidden="true">{open === i ? '–' : '+'}</span>
            </summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

window.PricingPage = PricingPage;
