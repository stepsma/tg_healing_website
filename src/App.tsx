import { useEffect, useState, type FormEvent } from "react";

const wechatQr = new URL("./assets/wechat-qr.jpg", import.meta.url).href;
const instagramQr = new URL("./assets/instagram-qr.jpg", import.meta.url).href;
const rednoteQr = new URL("./assets/rednote-qr.jpg", import.meta.url).href;

type Page = "home" | "services" | "contact";

const routes: Record<string, Page> = {
  "/": "home",
  "/index.html": "home",
  "/services": "services",
  "/services.html": "services",
  "/contact": "contact",
  "/contact.html": "contact",
};

function getPage(): Page {
  return routes[window.location.pathname] ?? "home";
}

function App() {
  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const onPopState = () => setPage(getPage());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setPage(getPage());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header onNavigate={navigate} />
      <main>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "services" && <ServicesPage onNavigate={navigate} />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer />
    </>
  );
}

function Header({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <header className="site-header">
      <nav className="nav">
        <NavLink className="logo" href="/" onNavigate={onNavigate}>
          <strong>TG Healing</strong>
          <span>缘来香识 · 香学院</span>
        </NavLink>
        <div className="nav-links">
          <NavLink href="/" onNavigate={onNavigate}>
            首页 Home
          </NavLink>
          <NavLink href="/services" onNavigate={onNavigate}>
            服务 Services
          </NavLink>
          <NavLink href="/contact" onNavigate={onNavigate}>
            预约 Contact
          </NavLink>
          <NavLink className="btn" href="/contact" onNavigate={onNavigate}>
            Book a Visit
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  className,
  children,
  onNavigate,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onNavigate: (path: string) => void;
}) {
  return (
    <a
      className={className}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </a>
  );
}

function HomePage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="kicker">Aromatherapy · Holistic Wellness · Healing Space</div>
            <h1>
              TG Healing <span className="cn">缘来香识 · 香学院</span>
            </h1>
            <p className="hero-text">
              以植物芳香，连接身心与生活。我们融合芳香疗法、中式养生智慧、精油手作与身心疗愈体验，
              陪伴你在草木香气中慢下来，重新感受身体、情绪与自然之间的连结。
            </p>
            <div className="hero-actions">
              <button className="btn" type="button" onClick={() => onNavigate("/contact")}>
                预约体验 Book Now
              </button>
              <button className="btn secondary" type="button" onClick={() => onNavigate("/services")}>
                查看服务 Explore Services
              </button>
            </div>
          </div>
          <div className="hero-card">
            <div className="visual-card">
              <div className="visual-caption healing-statement">
                <strong>We help the world Heal</strong>
                <span>我们为世界带来疗愈的力量</span>
                <p>我们始终坚持分享爱，以一次、一滴精油、一个人、一个家庭、一个社区的方式改变世界。</p>
                <p>
                  Through our loving and caring culture, we are changing the world by one drop, one person,
                  one family, one community at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-title">
          <div className="kicker">About TG Healing</div>
          <h2>一个有温度的芳香疗愈空间</h2>
          <p>
            我们相信，疗愈不只是一次服务，而是一种更温柔、更有觉察的生活方式。
            我们以植物精油为媒介，结合经络、节气、身心觉察与手作体验，让大人、孩子和家庭都能在香气中获得放松、创造与陪伴。
          </p>
        </div>
        <div className="service-scroll" aria-label="TG Healing service categories">
          <Card tag="Aromatherapy" title="芳香疗愈体验">
            结合植物精油、轻柔手法与身心放松，引导身体慢慢松开，也让情绪获得安放。
          </Card>
          <Card tag="Workshops" title="纯天然植物精油DIY手作">
            口红、香薰皂、香薰蜡烛、鼻炎膏、驱蚊膏、香水、香囊等，让香气成为看得见、带得走的生活美学。
          </Card>
          <Card tag="Seasonal Wellness" title="节气养生">
            结合二十四节气、中式养生与芳香疗法，探索更贴近自然节律的照护方式。
          </Card>
          <Card tag="Mind Body Spirit" title="身心灵疗愈课程">
            课程结合情绪觉察、能量疗愈、冥想引导、芳香疗法，帮助人们在忙碌生活中重新看见自己、理解自己，以达到个人成长和生命阶段的转变。
          </Card>
          <Card tag="Sound Healing" title="芳香颂钵音疗">
            结合植物精油香气与颂钵声音振动的深度放松体验。通过嗅觉、听觉与身体感知的多重引导，帮助身心慢慢安静下来，释放紧绷情绪，缓解压力疲惫，进入更深层的休息与平衡状态。
          </Card>
          <Card tag="Aroma Yoga" title="芳香瑜伽">
            将天然植物精油、呼吸练习、瑜伽体式与冥想放松结合在一起的身心练习课程。通过温和舒展的身体动作与精油香气的支持，觉察身体、调节呼吸、释放肩颈与背部压力，并在练习中找回身体的轻盈感与内在的安定感。
          </Card>
        </div>
      </section>

      <InfoBand
        quote="“让香气成为生活里的温柔提醒。”"
        items={[
          ["适合个人放松：", "芳香疗愈面部经络拨筋、芳香疗愈精油头疗、AromaTouch 芳香疗愈背部调理。"],
          ["适合团体&亲子体验：", "香薰手工皂、香薰蜡烛、精油调香、节日手作与香气小课堂。"],
          ["适合团体活动：", "公司团建、学校活动、社区公益课、私人定制疗愈聚会。"],
        ]}
      />

      <section className="photo-gallery-section">
        <div className="section-title">
          <div className="kicker">Photo Gallery</div>
          <h2>香气、手作与疗愈瞬间</h2>
          <p>从安静的疗愈空间，到植物精油手作、芳香音疗与瑜伽练习，记录 TG Healing 想带给日常生活的温柔感受。</p>
        </div>
        <div className="photo-gallery" aria-label="TG Healing photo gallery">
          <figure className="gallery-item tall">
            <img src="/gallery/healing-studio.png" alt="TG Healing 芳香疗愈空间" />
            <figcaption>芳香疗愈空间</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/gallery/oil-workshop.png" alt="精油 DIY 手作材料" />
            <figcaption>精油 DIY 手作</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/gallery/sound-healing.png" alt="芳香颂钵音疗布置" />
            <figcaption>芳香颂钵音疗</figcaption>
          </figure>
          <figure className="gallery-item wide">
            <img src="/gallery/aroma-yoga.png" alt="芳香瑜伽练习空间" />
            <figcaption>芳香瑜伽</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}

function ServicesPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <>
      <PageHero
        kicker="Services & Workshops"
        title="服务项目"
        subtitle="Aroma & Wellness Experiences"
      >
        每一次服务都从“人”的状态出发：身体是否紧绷，情绪是否疲惫，是否需要一点安静、陪伴与重新连接。
        TG Healing 以植物精油、轻柔手法、节气养生与手作体验，提供个人、亲子与团体都能参与的芳香疗愈服务。
      </PageHero>

      <section>
        <div className="section-title">
          <div className="kicker">One-on-one Healing</div>
          <h2>一对一芳香疗愈体验</h2>
          <p>适合想要深度放松、缓解疲惫、照顾睡眠与情绪状态的客人。实际体验可根据身体状态、香气偏好和当日需求微调。</p>
        </div>
        <div className="grid two">
          <ServiceCard
            tag="Facial Meridian Aromatherapy"
            title="芳香面部经络拨筋"
            details="适合：眼部疲劳、面部浮肿或紧绷、经常熬夜、压力大、肩颈压力、希望自然养护放松与提升气色的人群。可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。"
          >
            以天然植物精油结合中医经络养生理念，通过专业面部拨筋手法，疏通面部经络与气血循环，
            帮助舒缓面部紧张、改善肌肤状态、提升面部轮廓。在芳香疗愈与经络调理的双重作用下，
            让肌肤焕发自然光彩，同时帮助释放压力、平衡情绪，使身心获得深度放松与滋养。
          </ServiceCard>
          <ServiceCard
            tag="Head & Shoulder Aromatherapy"
            title="芳香精油头疗"
            details="适合：长时间面对电脑和手机，经常感到紧张焦虑、压力大，经常熬夜、睡眠质量差，经常头疼、容易疲劳，关注头皮健康，希望通过自然疗法疗愈和舒缓身心的人群。可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。"
          >
            芳香精油头疗结合天然植物精油与专业头部护理手法，通过对头皮、头部经络以及肩颈部位的调理，
            帮助促进头部循环、滋养头皮与秀发、舒缓紧张压力和头部疼痛、改善睡眠质量，
            让您在深度放松中重拾活力与平衡。
          </ServiceCard>
          <ServiceCard
            tag="AromaTouch Technique"
            title="AromaTouch 背部抚触调理"
            details="适合：工作压力大、长期疲劳、睡眠质量差、久坐办公室身体紧绷淤堵、希望定期呵护自己以恢复神经系统平衡和身心能量的人。 可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。"
          >
            沿背部与脊柱区域有序使用精油，以轻柔、稳定、重复的节奏支持身心放松。
            它不同于强按压按摩，更强调香气的疗愈作用带来深层的身心平衡与疗愈体验。
          </ServiceCard>
          <ServiceCard
            tag="Body Aromatherapy"
            title="芳香精油身体调理"
            details="适合：压力疲惫、身体紧张、需要调理某个部位的人群。 可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。"
          >
            以理疗级别精油结合背部或局部身体调理，让植物精油通过嗅觉、芳疗师的手法以及皮肤触感共同参与，
            帮助身体从紧绷中慢慢松开。
          </ServiceCard>
        </div>
      </section>

      <InfoBand
        quote="手作，是把香气带回生活的一种方式。"
        items={[
          ["每周精油 手作DIY：", "口红、唇膏、精油皂、香薰蜡烛、调香、鼻炎膏、驱蚊膏、护肤品等。"],
          ["主题公益课：", "春季过敏、儿童专注力、儿童成长、疼痛管理、肠胃照护、身心灵成长等。"],
          ["节气活动：", "节气手作、节气养生、节日节气植物香气体验。"],
        ]}
      />

      <section>
        <div className="section-title">
          <div className="kicker">Aromatherapy Certificate</div>
          <h2>芳香疗法认证课程</h2>
          <p>
            为希望系统学习植物精油、芳香疗法与日常身心照护的人设计。课程结合理论、实操、个案讨论与生活应用，
            帮助学员建立更完整、专业且安全的芳香疗愈基础。
          </p>
        </div>
        <div className="grid three">
          <Card title="系统精油知识">
            学习常见植物精油特性、使用方式、安全原则与日常照护场景，建立清晰可靠的芳香疗法基础。
          </Card>
          <Card title="疗愈实践与手法">
            结合嗅吸、调香、身体照护、情绪觉察与芳香触碰练习，让学习不只停留在知识，也能进入真实体验。
          </Card>
          <Card title="适合学习对象">
            适合芳疗爱好者、身心疗愈从业者、亲子照护者，以及希望把精油融入个人成长与家庭健康生活的人群。
          </Card>
        </div>
      </section>

      <section>
        <div className="section-title">
          <div className="kicker">Workshops & Events</div>
          <h2>课程、活动与私人定制</h2>
          <p>适合成人、亲子、学校、社区、公司团建与私人聚会。课程内容可按照年龄、季节、人数和场地进行设计。</p>
        </div>
        <div className="grid three">
          <Card title="Essential Oil DIY 精油手作">轻松、有趣、可带走成品。适合 10-15 人小班，也可为生日、闺蜜聚会和亲子活动定制。</Card>
          <Card title="亲子植物香气课">让孩子通过观察、触摸、闻香与动手制作认识植物，也让亲子在共同创作中放松连接。</Card>
          <Card title="公司团建与私人疗愈聚会">可设计植物精油洞悉卡、精油手作DIY、香觉冥想、节气手作、芳香瑜伽疗愈、芳香颂钵疗愈或轻奢疗愈日。</Card>
        </div>
        <div className="hero-actions">
          <button className="btn" type="button" onClick={() => onNavigate("/contact")}>
            预约 / 咨询课程
          </button>
          <button className="btn secondary" type="button" onClick={() => onNavigate("/")}>
            返回首页
          </button>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionError, setSubmissionError] = useState("");

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionStatus("submitting");
    setSubmissionError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    const bookingRequest = {
      name: String(formData.get("name") ?? "").trim(),
      contact: String(formData.get("contact") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      preferredTime: String(formData.get("preferredTime") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingRequest),
        signal: controller.signal,
      });

      const result = (await response.json().catch(() => ({}))) as { detail?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.detail || result.error || "Booking request failed");
      }

      form.reset();
      setSubmissionStatus("success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setSubmissionError(`提交暂时没有成功，请稍后再试。Submission failed. Please try again later. Debug: ${message}`);
      setSubmissionStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <>
      <PageHero kicker="Book & Contact" title="预约联系" subtitle="Begin with a Scent">
        欢迎预约一对一芳香疗愈体验、精油 DIY 课程、亲子活动、公司团建或私人定制疗愈聚会。
        你可以先简单告诉我们你的需求、人数、时间和想要的体验方向，我们会为你推荐合适的服务。
      </PageHero>

      <section>
        <div className="contact-wrap">
          <div className="contact-panel">
            <div className="section-title">
              <div className="kicker">Contact Info</div>
              <h2>联系我们</h2>
            </div>

            <div className="qr-grid" aria-label="Social media QR codes">
              <div className="qr-card">
                <div className="qr-card-heading">
                  <span className="brand-icon wechat-icon" aria-hidden="true"></span>
                  <strong>WeChat</strong>
                </div>
                <img className="contact-qr" src={wechatQr} alt="TG Healing 微信二维码" />
              </div>
              <div className="qr-card">
                <div className="qr-card-heading">
                  <span className="brand-icon instagram-icon" aria-hidden="true"></span>
                  <strong>Instagram</strong>
                </div>
                <img className="contact-qr" src={instagramQr} alt="TG Healing Instagram 二维码" />
              </div>
              <div className="qr-card">
                <div className="qr-card-heading">
                  <span className="brand-icon rednote-icon" aria-hidden="true">R</span>
                  <strong>rednote</strong>
                </div>
                <img className="contact-qr" src={rednoteQr} alt="缘来香识香学院 Rednote 二维码" />
              </div>
            </div>
            <ContactRow label="Email">tghealing@gmail.com</ContactRow>
            <ContactRow label="Location">Bellevue / Seattle Area, Washington</ContactRow>
            <ContactRow label="Hours">By appointment only · 预约制</ContactRow>

            <div className="note">
              温馨提示：如预约芳香疗愈体验，请提前告知是否怀孕、是否有皮肤敏感、近期身体状况或特殊气味禁忌。
            </div>
          </div>

          <div className="contact-panel">
            <div className="section-title">
              <div className="kicker">Booking Request</div>
              <h2>预约需求表</h2>
            </div>

            <form
              className="form"
              onSubmit={handleBookingSubmit}
            >
              <input type="hidden" name="website" tabIndex={-1} autoComplete="off" />
              <label>
                姓名 Name
                <input name="name" type="text" placeholder="Your name" />
              </label>
              <label>
                联系方式 Contact
                <input name="contact" type="text" placeholder="Phone / WeChat / Email" />
              </label>
              <label>
                想预约的项目 Service
                <select name="service" defaultValue="芳香面部经络拨筋">
                  <option>芳香面部经络拨筋</option>
                  <option>芳香精油头疗</option>
                  <option>AromaTouch / 身体调理</option>
                  <option>精油 DIY 工作坊</option>
                  <option>亲子活动</option>
                  <option>公司团建 / 私人定制</option>
                  <option>不确定，想先咨询</option>
                </select>
              </label>
              <label>
                期望时间 Preferred Time
                <input name="preferredTime" type="text" placeholder="例如：周二上午 / 周六下午 / 某个具体日期" />
              </label>
              <label>
                你的需求 Message
                <textarea name="message" placeholder="请简单描述人数、身体状态、活动主题或希望达到的体验效果。" />
              </label>
              <button className="btn" type="submit" disabled={submissionStatus === "submitting"}>
                {submissionStatus === "submitting" ? "Sending..." : "Submit Request"}
              </button>
              {submissionStatus === "error" && (
                <div className="form-error" role="alert">
                  {submissionError}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {submissionStatus === "success" && (
        <div className="submit-overlay" role="dialog" aria-modal="true" aria-labelledby="submit-success-title">
          <div className="submit-modal">
            <div className="submit-mark" aria-hidden="true">
              ✓
            </div>
            <h3 id="submit-success-title">您的信息已发送</h3>
            <p>我们会尽快与您联系。</p>
            <p>Your message has been sent. We will contact you soon.</p>
            <button className="btn" type="button" onClick={() => setSubmissionStatus("idle")}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function PageHero({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="service-hero">
      <div className="page-hero">
        <div className="kicker">{kicker}</div>
        <h1>
          {title} <span className="cn">{subtitle}</span>
        </h1>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Card({
  tag,
  title,
  children,
}: {
  tag?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      {tag && <span className="tag">{tag}</span>}
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function ServiceCard({
  tag,
  title,
  details,
  children,
}: {
  tag: string;
  title: string;
  details: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <span className="tag">{tag}</span>
      <h3>{title}</h3>
      <p>{children}</p>
      <div className="details">{details}</div>
    </div>
  );
}

function InfoBand({
  quote,
  items,
}: {
  quote: string;
  items: Array<[string, string]>;
}) {
  return (
    <section className="band">
      <div className="band-inner">
        <div className="quote">{quote}</div>
        <div className="list">
          {items.map(([label, text]) => (
            <div className="list-item" key={label}>
              <strong>{label}</strong>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="contact-row">
      <strong>{label}</strong>
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>TG Healing · 缘来香识香学院</strong>
          <br />
          Aromatherapy · Holistic Wellness · Healing Space
        </div>
        <div>
          <div className="footer-phone">
            <span>联系电话：</span>
            <span>
              +1 813-748-1290
              <br />
              +1 951-880-7080
            </span>
          </div>
          <br />
          地址：13555 NE Bel Red Rd Unit 200 Bellevue WA 98005
        </div>
      </div>
    </footer>
  );
}

export default App;
