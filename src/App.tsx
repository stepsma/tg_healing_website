import { useEffect, useState, type FormEvent, type ReactNode } from "react";

const wechatQr = new URL("./assets/wechat-qr.jpg", import.meta.url).href;
const instagramQr = new URL("./assets/instagram-qr.jpg", import.meta.url).href;
const rednoteQr = new URL("./assets/rednote-qr.jpg", import.meta.url).href;

type Page = "home" | "services" | "contact";
type Language = "zh" | "en";

const routes: Record<string, Page> = {
  "/": "home",
  "/index.html": "home",
  "/services": "services",
  "/services.html": "services",
  "/contact": "contact",
  "/contact.html": "contact",
};

const content = {
  zh: {
    logoSub: "缘来香识 · 香学院",
    nav: {
      home: "首页 Home",
      services: "服务 Services",
      contact: "预约 Contact",
      cta: "Book a Visit",
      languageLabel: "Language",
    },
    home: {
      kicker: "Aromatherapy · Holistic Wellness · Healing Space",
      title: "TG Healing",
      titleSub: "缘来香识 · 香学院",
      intro:
        "以植物芳香，连接身心与生活。我们融合芳香疗法、中式养生智慧、精油手作与身心疗愈体验，陪伴你在草木香气中慢下来，重新感受身体、情绪与自然之间的连结。",
      primaryCta: "预约体验 Book Now",
      secondaryCta: "查看服务 Explore Services",
      statementTitle: "We help the world Heal",
      statementSubtitle: "我们为世界带来疗愈的力量",
      statementBody:
        "我们始终坚持分享爱，以一次、一滴精油、一个人、一个家庭、一个社区的方式改变世界。",
      statementBodyEn:
        "Through our loving and caring culture, we are changing the world by one drop, one person, one family, one community at a time.",
      aboutKicker: "About TG Healing",
      aboutTitle: "一个有温度的芳香疗愈空间",
      aboutText:
        "我们相信，疗愈不只是一次服务，而是一种更温柔、更有觉察的生活方式。 我们以植物精油为媒介，结合经络、节气、身心觉察与手作体验，让大人、孩子和家庭都能在香气中获得放松、创造与陪伴。",
      serviceCategoriesLabel: "TG Healing service categories",
      categoryCards: [
        {
          tag: "Aromatherapy",
          title: "芳香疗愈体验",
          body: "结合植物精油、轻柔手法与身心放松，引导身体慢慢松开，也让情绪获得安放。",
        },
        {
          tag: "Workshops",
          title: "纯天然植物精油DIY手作",
          body: "口红、香薰皂、香薰蜡烛、鼻炎膏、驱蚊膏、香水、香囊等，让香气成为看得见、带得走的生活美学。",
        },
        {
          tag: "Seasonal Wellness",
          title: "节气养生",
          body: "结合二十四节气、中式养生与芳香疗法，探索更贴近自然节律的照护方式。",
        },
        {
          tag: "Mind Body Spirit",
          title: "身心灵疗愈课程",
          body: "课程结合情绪觉察、能量疗愈、冥想引导、芳香疗法，帮助人们在忙碌生活中重新看见自己、理解自己，以达到个人成长和生命阶段的转变。",
        },
        {
          tag: "Sound Healing",
          title: "芳香颂钵音疗",
          body: "结合植物精油香气与颂钵声音振动的深度放松体验。通过嗅觉、听觉与身体感知的多重引导，帮助身心慢慢安静下来，释放紧绷情绪，缓解压力疲惫，进入更深层的休息与平衡状态。",
        },
        {
          tag: "Aroma Yoga",
          title: "芳香瑜伽",
          body: "将天然植物精油、呼吸练习、瑜伽体式与冥想放松结合在一起的身心练习课程。通过温和舒展的身体动作与精油香气的支持，觉察身体、调节呼吸、释放肩颈与背部压力，并在练习中找回身体的轻盈感与内在的安定感。",
        },
      ],
      infoQuote: "“让香气成为生活里的温柔提醒。”",
      infoItems: [
        ["适合个人放松：", "芳香疗愈面部经络拨筋、芳香疗愈精油头疗、AromaTouch 芳香疗愈背部调理。"],
        ["适合团体&亲子体验：", "香薰手工皂、香薰蜡烛、精油调香、节日手作与香气小课堂。"],
        ["适合团体活动：", "公司团建、学校活动、社区公益课、私人定制疗愈聚会。"],
      ] as Array<[string, string]>,
      galleryKicker: "Photo Gallery",
      galleryTitle: "香气、手作与疗愈瞬间",
      galleryText:
        "从安静的疗愈空间，到植物精油手作、芳香音疗与瑜伽练习，记录 TG Healing 想带给日常生活的温柔感受。",
      galleryLabel: "TG Healing photo gallery",
      galleryItems: [
        ["healing-studio.png", "TG Healing 芳香疗愈空间", "芳香疗愈空间", "tall"],
        ["oil-workshop.png", "精油 DIY 手作材料", "精油 DIY 手作", ""],
        ["sound-healing.png", "芳香颂钵音疗布置", "芳香颂钵音疗", ""],
        ["aroma-yoga.png", "芳香瑜伽练习空间", "芳香瑜伽", "wide"],
      ] as Array<[string, string, string, string]>,
    },
    services: {
      heroKicker: "Services & Workshops",
      heroTitle: "服务项目",
      heroSubtitle: "Aroma & Wellness Experiences",
      heroText:
        "每一次服务都从“人”的状态出发：身体是否紧绷，情绪是否疲惫，是否需要一点安静、陪伴与重新连接。 TG Healing 以植物精油、轻柔手法、节气养生与手作体验，提供个人、亲子与团体都能参与的芳香疗愈服务。",
      oneKicker: "One-on-one Healing",
      oneTitle: "一对一芳香疗愈体验",
      oneText:
        "适合想要深度放松、缓解疲惫、照顾睡眠与情绪状态的客人。实际体验可根据身体状态、香气偏好和当日需求微调。",
      serviceCards: [
        {
          tag: "Facial Meridian Aromatherapy",
          title: "芳香面部经络拨筋",
          body: "以天然植物精油结合中医经络养生理念，通过专业面部拨筋手法，疏通面部经络与气血循环，帮助舒缓面部紧张、改善肌肤状态、提升面部轮廓。在芳香疗愈与经络调理的双重作用下，让肌肤焕发自然光彩，同时帮助释放压力、平衡情绪，使身心获得深度放松与滋养。",
          details:
            "适合：眼部疲劳、面部浮肿或紧绷、经常熬夜、压力大、肩颈压力、希望自然养护放松与提升气色的人群。可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。",
        },
        {
          tag: "Head & Shoulder Aromatherapy",
          title: "芳香精油头疗",
          body: "芳香精油头疗结合天然植物精油与专业头部护理手法，通过对头皮、头部经络以及肩颈部位的调理，帮助促进头部循环、滋养头皮与秀发、舒缓紧张压力和头部疼痛、改善睡眠质量，让您在深度放松中重拾活力与平衡。",
          details:
            "适合：长时间面对电脑和手机，经常感到紧张焦虑、压力大，经常熬夜、睡眠质量差，经常头疼、容易疲劳，关注头皮健康，希望通过自然疗法疗愈和舒缓身心的人群。可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。",
        },
        {
          tag: "AromaTouch Technique",
          title: "AromaTouch 背部抚触调理",
          body: "沿背部与脊柱区域有序使用精油，以轻柔、稳定、重复的节奏支持身心放松。 它不同于强按压按摩，更强调香气的疗愈作用带来深层的身心平衡与疗愈体验。",
          details:
            "适合：工作压力大、长期疲劳、睡眠质量差、久坐办公室身体紧绷淤堵、希望定期呵护自己以恢复神经系统平衡和身心能量的人。 可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。",
        },
        {
          tag: "Body Aromatherapy",
          title: "芳香精油身体调理",
          body: "以理疗级别精油结合背部或局部身体调理，让植物精油通过嗅觉、芳疗师的手法以及皮肤触感共同参与，帮助身体从紧绷中慢慢松开。",
          details:
            "适合：压力疲惫、身体紧张、需要调理某个部位的人群。 可做单次体验，也可设计多次调理方案。项目价格及时长：原价 $98/50分钟，*会员价 $88/50分钟。",
        },
      ],
      bandQuote: "手作，是把香气带回生活的一种方式。",
      bandItems: [
        ["每周精油 手作DIY：", "口红、唇膏、精油皂、香薰蜡烛、调香、鼻炎膏、驱蚊膏、护肤品等。"],
        ["主题公益课：", "春季过敏、儿童专注力、儿童成长、疼痛管理、肠胃照护、身心灵成长等。"],
        ["节气活动：", "节气手作、节气养生、节日节气植物香气体验。"],
      ] as Array<[string, string]>,
      certificateKicker: "Aromatherapy Certificate",
      certificateTitle: "芳香疗法认证课程",
      certificateText:
        "为希望系统学习植物精油、芳香疗法与日常身心照护的人设计。课程结合理论、实操、个案讨论与生活应用，帮助学员建立更完整、专业且安全的芳香疗愈基础。",
      certificateCards: [
        {
          title: "系统精油知识",
          body: "学习常见植物精油特性、使用方式、安全原则与日常照护场景，建立清晰可靠的芳香疗法基础。",
        },
        {
          title: "疗愈实践与手法",
          body: "结合嗅吸、调香、身体照护、情绪觉察与芳香触碰练习，让学习不只停留在知识，也能进入真实体验。",
        },
        {
          title: "适合学习对象",
          body: "适合芳疗爱好者、身心疗愈从业者、亲子照护者，以及希望把精油融入个人成长与家庭健康生活的人群。",
        },
      ],
      workshopsKicker: "Workshops & Events",
      workshopsTitle: "课程、活动与私人定制",
      workshopsText: "适合成人、亲子、学校、社区、公司团建与私人聚会。课程内容可按照年龄、季节、人数和场地进行设计。",
      workshopCards: [
        {
          title: "Essential Oil DIY 精油手作",
          body: "轻松、有趣、可带走成品。适合 10-15 人小班，也可为生日、闺蜜聚会和亲子活动定制。",
        },
        {
          title: "亲子植物香气课",
          body: "让孩子通过观察、触摸、闻香与动手制作认识植物，也让亲子在共同创作中放松连接。",
        },
        {
          title: "公司团建与私人疗愈聚会",
          body: "可设计植物精油洞悉卡、精油手作DIY、香觉冥想、节气手作、芳香瑜伽疗愈、芳香颂钵疗愈或轻奢疗愈日。",
        },
      ],
      contactCta: "预约 / 咨询课程",
      homeCta: "返回首页",
    },
    contact: {
      heroKicker: "Book & Contact",
      heroTitle: "预约联系",
      heroSubtitle: "Begin with a Scent",
      heroText:
        "欢迎预约一对一芳香疗愈体验、精油 DIY 课程、亲子活动、公司团建或私人定制疗愈聚会。 你可以先简单告诉我们你的需求、人数、时间和想要的体验方向，我们会为你推荐合适的服务。",
      infoKicker: "Contact Info",
      infoTitle: "联系我们",
      qrLabel: "Social media QR codes",
      emailLabel: "Email",
      locationLabel: "Location",
      location: "Bellevue / Seattle Area, Washington",
      hoursLabel: "Hours",
      hours: "By appointment only · 预约制",
      note: "温馨提示：如预约芳香疗愈体验，请提前告知是否怀孕、是否有皮肤敏感、近期身体状况或特殊气味禁忌。",
      bookingKicker: "Booking Request",
      bookingTitle: "预约需求表",
      nameLabel: "姓名 Name",
      namePlaceholder: "Your name",
      contactLabel: "联系方式 Contact",
      contactPlaceholder: "Phone / WeChat / Email",
      serviceLabel: "想预约的项目 Service",
      timeLabel: "期望时间 Preferred Time",
      timePlaceholder: "例如：周二上午 / 周六下午 / 某个具体日期",
      messageLabel: "你的需求 Message",
      messagePlaceholder: "请简单描述人数、身体状态、活动主题或希望达到的体验效果。",
      sending: "Sending...",
      submit: "Submit Request",
      error:
        "提交暂时没有成功，请稍后再试。若一直无法发送，请加微信或小红书联系我们。Submission failed. Please try again later. If it keeps failing, please contact us through WeChat or rednote.",
      successTitle: "您的信息已发送",
      successLineOne: "我们会尽快与您联系。",
      successLineTwo: "Your message has been sent. We will contact you soon.",
      options: [
        "芳香面部经络拨筋",
        "芳香精油头疗",
        "AromaTouch / 身体调理",
        "精油 DIY 工作坊",
        "亲子活动",
        "公司团建 / 私人定制",
        "不确定，想先咨询",
      ],
    },
    footer: {
      brand: "TG Healing · 缘来香识香学院",
      line: "Aromatherapy · Holistic Wellness · Healing Space",
      phone: "联系电话：",
      address: "地址：13555 NE Bel Red Rd Unit 200 Bellevue WA 98005",
    },
  },
  en: {
    logoSub: "Aroma Healing",
    nav: {
      home: "Home",
      services: "Services",
      contact: "Contact",
      cta: "Book a Visit",
      languageLabel: "Language",
    },
    home: {
      kicker: "Aromatherapy · Holistic Wellness · Healing Space",
      title: "TG Healing",
      titleSub: "Aroma Healing",
      intro:
        "We connect body, mind, and everyday life through the language of plants. Blending aromatherapy, Chinese wellness wisdom, essential oil handcrafts, and holistic healing experiences, we invite you to slow down and reconnect with your body, emotions, and nature.",
      primaryCta: "Book Now",
      secondaryCta: "Explore Services",
      statementTitle: "We help the world Heal",
      statementSubtitle: "Bringing healing energy to the world",
      statementBody: "",
      statementBodyEn:
        "Through our loving and caring culture, we are changing the world by one drop, one person, one family, one community at a time.",
      aboutKicker: "About TG Healing",
      aboutTitle: "A warm aromatherapy healing space",
      aboutText:
        "We believe healing is not just a single service, but a gentler and more mindful way of living. Using pure plant essential oils, we combine meridian care, seasonal wellness, body-mind awareness, and hands-on creative experiences so adults, children, and families can find rest, creativity, and connection through scent.",
      serviceCategoriesLabel: "TG Healing service categories",
      categoryCards: [
        {
          tag: "Aromatherapy",
          title: "Aromatherapy Healing",
          body: "Plant essential oils, gentle touch, and mindful relaxation help to ease the tightness of your body and relief stress and emotions.",
        },
        {
          tag: "Workshops",
          title: "Natural Essential Oil DIY",
          body: "Lipstick, handmade natural soap and candles, sinus balm, bug balm, essential oils perfume, sachets, and more: scent becomes a beautiful part of daily life that you can see and take home.",
        },
        {
          tag: "Seasonal Wellness",
          title: "Seasonal Wellness",
          body: "Explore care that follows nature's rhythm through the 24 solar terms, Chinese wellness practices, and aromatherapy.",
        },
        {
          tag: "Mind Body Spirit",
          title: "Mind-Body-Spirit Healing Courses",
          body: "Courses blend emotional awareness, energy healing, guided meditation, and aromatherapy to help people see and understand themselves more deeply during personal growth and life transitions.",
        },
        {
          tag: "Sound Healing",
          title: "Aroma Singing Bowl Sound Healing",
          body: "A deeply relaxing experience that combines plant aromas with singing bowl vibrations. Scent, sound, and body awareness guide the nervous system into calm, ease, and deeper rest.",
        },
        {
          tag: "Aroma Yoga",
          title: "Aroma Yoga",
          body: "Natural essential oils, breathwork, yoga postures, and meditation come together in a gentle practice that helps release shoulder, neck, and back tension while restoring lightness and inner steadiness.",
        },
      ],
      infoQuote: "“Let scent become a gentle reminder in everyday life.”",
      infoItems: [
        [
          "For personal relaxation: ",
          "facial meridian aromatherapy, essential oil head therapy, and AromaTouch back care.",
        ],
        [
          "For groups and families: ",
          "handmade natural soap and candles, oil blending, seasonal crafts, and beginner-friendly scent classes.",
        ],
        [
          "For group events: ",
          "corporate team building, school programs, community classes, and private healing gatherings.",
        ],
      ] as Array<[string, string]>,
      galleryKicker: "Photo Gallery",
      galleryTitle: "Moments of scent, craft, and healing",
      galleryText:
        "From a quiet healing space to essential oil handcrafts, aroma sound healing, and yoga practice, these moments capture the gentleness TG Healing brings into daily life.",
      galleryLabel: "TG Healing photo gallery",
      galleryItems: [
        ["healing-studio.png", "TG Healing aromatherapy space", "Healing Space", "tall"],
        ["oil-workshop.png", "Essential oil DIY materials", "Essential Oil DIY", ""],
        ["sound-healing.png", "Aroma singing bowl sound healing setup", "Sound Healing", ""],
        ["aroma-yoga.png", "Aroma yoga practice space", "Aroma Yoga", "wide"],
      ] as Array<[string, string, string, string]>,
    },
    services: {
      heroKicker: "Services & Workshops",
      heroTitle: "Services",
      heroSubtitle: "Aroma & Wellness Experiences",
      heroText:
        "Every service begins with your current state: whether your body feels tight, your emotions feel tired, or you simply need quiet, care, and reconnection. TG Healing offers aromatherapy services for individuals, families, and groups through plant essential oils, gentle touch, seasonal wellness, and hands-on experiences.",
      oneKicker: "One-on-one Healing",
      oneTitle: "One-on-one Aromatherapy Experiences",
      oneText:
        "Designed for guests who want deep relaxation, fatigue relief, better sleep support, and emotional care. Each session can be adjusted based on your body, scent preferences, and needs that day.",
      serviceCards: [
        {
          tag: "Facial Meridian Aromatherapy",
          title: "Facial Meridian Aromatherapy",
          body: "Natural plant essential oils are combined with Chinese meridian wellness principles and professional facial gua sha style techniques to support facial meridian flow and circulation, ease facial tension, improve skin condition, and refine facial contours. Through aromatherapy and meridian care, the skin can glow naturally while stress is released and emotions are balanced.",
          details:
            "Best for: eye fatigue, facial puffiness or tightness, late nights, stress, shoulder and neck pressure, and anyone seeking natural care, relaxation, and a brighter complexion. Single sessions and multi-session care plans are available. Price and duration: regular price $98/50 minutes, *member price $88/50 minutes.",
        },
        {
          tag: "Head Aromatherapy",
          title: "Essential Oil Head Therapy",
          body: "This head therapy combines natural plant essential oils with professional head-care techniques. By caring for the scalp, head meridians, and shoulder-neck area, it helps support circulation, nourish the scalp and hair, ease tension and headaches, improve sleep quality, and restore vitality and balance through deep relaxation.",
          details:
            "Best for: people who spend long hours on computers or phones, often feel anxious or stressed, stay up late, sleep poorly, have frequent headaches or fatigue, care about scalp health, and want natural therapy for body-mind relief. Single sessions and multi-session care plans are available. Price and duration: regular price $98/50 minutes, *member price $88/50 minutes.",
        },
        {
          tag: "AromaTouch Technique",
          title: "AromaTouch Back Care",
          body: "Essential oils are applied along the back and spine in an intentional sequence with gentle, steady, repeated touch to support full-body relaxation. Unlike deep-pressure massage, this experience emphasizes the healing effect of aroma and brings a deeper sense of body-mind balance.",
          details:
            "Best for: work stress, long-term fatigue, poor sleep, tightness from sitting at a desk, and anyone who wants regular self-care to restore nervous system balance and energy. Single sessions and multi-session care plans are available. Price and duration: regular price $98/50 minutes, *member price $88/50 minutes.",
        },
        {
          tag: "Body Aromatherapy",
          title: "Essential Oil Body Care",
          body: "Therapeutic-grade essential oils are combined with back or focused body care. Through scent, the aromatherapist's touch, and skin sensation, the body is invited to slowly release tightness.",
          details:
            "Best for: stress, fatigue, body tension, and people who need focused care for a specific area. Single sessions and multi-session care plans are available. Price and duration: regular price $98/50 minutes, *member price $88/50 minutes.",
        },
      ],
      bandQuote: "Handcrafting is a way to bring scent back into everyday life.",
      bandItems: [
        [
          "Weekly essential oil DIY: ",
          "lipstick, lip balm, essential oil soap, aroma candles, blending, sinus balm, bug balm, skincare, and more.",
        ],
        [
          "Community classes: ",
          "spring allergies, children's focus, children's growth, pain management, digestive care, and mind-body-spirit growth.",
        ],
        ["Seasonal events: ", "seasonal crafts, seasonal wellness, and plant aroma experiences for holidays and solar terms."],
      ] as Array<[string, string]>,
      certificateKicker: "Aromatherapy Certificate",
      certificateTitle: "Aromatherapy Certificate Program",
      certificateText:
        "Designed for people who want to study plant essential oils, aromatherapy, and everyday body-mind care in a systematic way. The program combines theory, hands-on practice, case discussion, and real-life application to build a complete, professional, and safe foundation in aromatherapy.",
      certificateCards: [
        {
          title: "Systematic Essential Oil Knowledge",
          body: "Learn the properties, methods of use, safety principles, and daily care scenarios of common plant essential oils.",
        },
        {
          title: "Healing Practice & Techniques",
          body: "Practice inhalation, blending, body care, emotional awareness, and aromatic touch so the learning becomes both knowledge and lived experience.",
        },
        {
          title: "Who It Is For",
          body: "For aromatherapy enthusiasts, holistic wellness practitioners, parents and caregivers, and anyone who wants to bring essential oils into personal growth and family wellness.",
        },
      ],
      workshopsKicker: "Workshops & Events",
      workshopsTitle: "Classes, Events & Private Custom Experiences",
      workshopsText:
        "For adults, families, schools, communities, corporate team building, and private gatherings. Content can be designed around age, season, group size, and venue.",
      workshopCards: [
        {
          title: "Essential Oil DIY",
          body: "Light, fun, and hands-on, with finished products to take home. Great for groups of 10-15, birthdays, friends' gatherings, and family activities.",
        },
        {
          title: "Parent-Child Plant Aroma Class",
          body: "Children learn about plants through observing, touching, smelling, and making, while families relax and connect through shared creativity.",
        },
        {
          title: "Corporate & Private Healing Gatherings",
          body: "Options include plant essential oil insight cards, essential oil DIY, scent meditation, seasonal crafts, aroma yoga healing, aroma singing bowl healing, and boutique healing days.",
        },
      ],
      contactCta: "Book / Ask About a Class",
      homeCta: "Back Home",
    },
    contact: {
      heroKicker: "Book & Contact",
      heroTitle: "Contact",
      heroSubtitle: "Begin with a Scent",
      heroText:
        "You are welcome to book a one-on-one aromatherapy session, essential oil DIY class, family activity, corporate team-building event, or private healing gathering. Tell us your needs, group size, preferred time, and the kind of experience you are looking for, and we will recommend the right service.",
      infoKicker: "Contact Info",
      infoTitle: "Contact Us",
      qrLabel: "Social media QR codes",
      emailLabel: "Email",
      locationLabel: "Location",
      location: "Bellevue / Seattle Area, Washington",
      hoursLabel: "Hours",
      hours: "By appointment only",
      note:
        "Kind note: for aromatherapy sessions, please let us know in advance if you are pregnant, have skin sensitivities, recent health concerns, or any scent restrictions.",
      bookingKicker: "Booking Request",
      bookingTitle: "Booking Request",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      contactLabel: "Contact",
      contactPlaceholder: "Phone / WeChat / Email",
      serviceLabel: "Service",
      timeLabel: "Preferred Time",
      timePlaceholder: "For example: Tuesday morning, Saturday afternoon, or a specific date",
      messageLabel: "Message",
      messagePlaceholder: "Please briefly share your group size, body condition, event theme, or desired experience.",
      sending: "Sending...",
      submit: "Submit Request",
      error: "Submission failed. Please try again later. If it keeps failing, please contact us through WeChat or rednote.",
      successTitle: "Your message has been sent",
      successLineOne: "We will contact you soon.",
      successLineTwo: "Thank you for reaching out to TG Healing.",
      options: [
        "Facial Meridian Aromatherapy",
        "Essential Oil Head Therapy",
        "AromaTouch / Body Care",
        "Essential Oil DIY Workshop",
        "Parent-Child Activity",
        "Corporate / Private Custom Event",
        "Not sure yet, I would like to ask first",
      ],
    },
    footer: {
      brand: "TG Healing · Aroma Healing",
      line: "Aromatherapy · Holistic Wellness · Healing Space",
      phone: "Phone:",
      address: "Address: 13555 NE Bel Red Rd Unit 200 Bellevue WA 98005",
    },
  },
} as const;

function getPage(): Page {
  return routes[window.location.pathname] ?? "home";
}

function getInitialLanguage(): Language {
  return window.localStorage.getItem("tg-healing-language") === "en" ? "en" : "zh";
}

function App() {
  const [page, setPage] = useState<Page>(getPage);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const onPopState = () => setPage(getPage());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("tg-healing-language", language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setPage(getPage());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} onNavigate={navigate} />
      <main>
        {page === "home" && <HomePage language={language} onNavigate={navigate} />}
        {page === "services" && <ServicesPage language={language} onNavigate={navigate} />}
        {page === "contact" && <ContactPage language={language} />}
      </main>
      <Footer language={language} />
    </>
  );
}

function Header({
  language,
  onLanguageChange,
  onNavigate,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onNavigate: (path: string) => void;
}) {
  const t = content[language];

  return (
    <header className="site-header">
      <nav className="nav">
        <NavLink className="logo" href="/" onNavigate={onNavigate}>
          <strong>TG Healing</strong>
          <span>{t.logoSub}</span>
        </NavLink>
        <div className="nav-links">
          <NavLink href="/" onNavigate={onNavigate}>
            {t.nav.home}
          </NavLink>
          <NavLink href="/services" onNavigate={onNavigate}>
            {t.nav.services}
          </NavLink>
          <NavLink href="/contact" onNavigate={onNavigate}>
            {t.nav.contact}
          </NavLink>
          <div className="language-toggle" aria-label={t.nav.languageLabel}>
            <button
              className={language === "zh" ? "active" : ""}
              type="button"
              aria-pressed={language === "zh"}
              onClick={() => onLanguageChange("zh")}
            >
              中文
            </button>
            <button
              className={language === "en" ? "active" : ""}
              type="button"
              aria-pressed={language === "en"}
              onClick={() => onLanguageChange("en")}
            >
              EN
            </button>
          </div>
          <NavLink className="btn" href="/contact" onNavigate={onNavigate}>
            {t.nav.cta}
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
  children: ReactNode;
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

function HomePage({ language, onNavigate }: { language: Language; onNavigate: (path: string) => void }) {
  const t = content[language].home;

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="kicker">{t.kicker}</div>
            <h1>
              {t.title} <span className="cn">{t.titleSub}</span>
            </h1>
            <p className="hero-text">{t.intro}</p>
            <div className="hero-actions">
              <button className="btn" type="button" onClick={() => onNavigate("/contact")}>
                {t.primaryCta}
              </button>
              <button className="btn secondary" type="button" onClick={() => onNavigate("/services")}>
                {t.secondaryCta}
              </button>
            </div>
          </div>
          <div className="hero-card">
            <div className="visual-card">
              <div className="visual-caption healing-statement">
                <strong>{t.statementTitle}</strong>
                <span>{t.statementSubtitle}</span>
                {t.statementBody && <p>{t.statementBody}</p>}
                <p>{t.statementBodyEn}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="section-title">
          <div className="kicker">{t.aboutKicker}</div>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
        </div>
        <div className="service-scroll" aria-label={t.serviceCategoriesLabel}>
          {t.categoryCards.map((card) => (
            <Card key={card.title} tag={card.tag} title={card.title}>
              {card.body}
            </Card>
          ))}
        </div>
      </section>

      <InfoBand quote={t.infoQuote} items={t.infoItems} />

      <section className="photo-gallery-section">
        <div className="section-title">
          <div className="kicker">{t.galleryKicker}</div>
          <h2>{t.galleryTitle}</h2>
          <p>{t.galleryText}</p>
        </div>
        <div className="photo-gallery" aria-label={t.galleryLabel}>
          {t.galleryItems.map(([src, alt, caption, className]) => (
            <figure className={`gallery-item ${className}`.trim()} key={src}>
              <img src={`/gallery/${src}`} alt={alt} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}

function ServicesPage({ language, onNavigate }: { language: Language; onNavigate: (path: string) => void }) {
  const t = content[language].services;

  return (
    <>
      <PageHero kicker={t.heroKicker} title={t.heroTitle} subtitle={t.heroSubtitle}>
        {t.heroText}
      </PageHero>

      <section>
        <div className="section-title">
          <div className="kicker">{t.oneKicker}</div>
          <h2>{t.oneTitle}</h2>
          <p>{t.oneText}</p>
        </div>
        <div className="grid two">
          {t.serviceCards.map((card) => (
            <ServiceCard key={card.title} tag={card.tag} title={card.title} details={card.details}>
              {card.body}
            </ServiceCard>
          ))}
        </div>
      </section>

      <InfoBand quote={t.bandQuote} items={t.bandItems} />

      <section>
        <div className="section-title">
          <div className="kicker">{t.certificateKicker}</div>
          <h2>{t.certificateTitle}</h2>
          <p>{t.certificateText}</p>
        </div>
        <div className="grid three">
          {t.certificateCards.map((card) => (
            <Card key={card.title} title={card.title}>
              {card.body}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="section-title">
          <div className="kicker">{t.workshopsKicker}</div>
          <h2>{t.workshopsTitle}</h2>
          <p>{t.workshopsText}</p>
        </div>
        <div className="grid three">
          {t.workshopCards.map((card) => (
            <Card key={card.title} title={card.title}>
              {card.body}
            </Card>
          ))}
        </div>
        <div className="hero-actions">
          <button className="btn" type="button" onClick={() => onNavigate("/contact")}>
            {t.contactCta}
          </button>
          <button className="btn secondary" type="button" onClick={() => onNavigate("/")}>
            {t.homeCta}
          </button>
        </div>
      </section>
    </>
  );
}

function ContactPage({ language }: { language: Language }) {
  const t = content[language].contact;
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

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Booking request failed");
      }

      form.reset();
      setSubmissionStatus("success");
    } catch {
      setSubmissionError(t.error);
      setSubmissionStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <>
      <PageHero kicker={t.heroKicker} title={t.heroTitle} subtitle={t.heroSubtitle}>
        {t.heroText}
      </PageHero>

      <section>
        <div className="contact-wrap">
          <div className="contact-panel">
            <div className="section-title">
              <div className="kicker">{t.infoKicker}</div>
              <h2>{t.infoTitle}</h2>
            </div>

            <div className="qr-grid" aria-label={t.qrLabel}>
              <div className="qr-card">
                <div className="qr-card-heading">
                  <span className="brand-icon wechat-icon" aria-hidden="true"></span>
                  <strong>WeChat</strong>
                </div>
                <img className="contact-qr" src={wechatQr} alt="TG Healing WeChat QR code" />
              </div>
              <div className="qr-card">
                <div className="qr-card-heading">
                  <span className="brand-icon instagram-icon" aria-hidden="true"></span>
                  <strong>Instagram</strong>
                </div>
                <img className="contact-qr" src={instagramQr} alt="TG Healing Instagram QR code" />
              </div>
              <div className="qr-card">
                <div className="qr-card-heading">
                  <span className="brand-icon rednote-icon" aria-hidden="true">
                    R
                  </span>
                  <strong>rednote</strong>
                </div>
                <img className="contact-qr" src={rednoteQr} alt="TG Healing rednote QR code" />
              </div>
            </div>
            <ContactRow label={t.emailLabel}>tghealing@gmail.com</ContactRow>
            <ContactRow label={t.locationLabel}>{t.location}</ContactRow>
            <ContactRow label={t.hoursLabel}>{t.hours}</ContactRow>

            <div className="note">{t.note}</div>
          </div>

          <div className="contact-panel">
            <div className="section-title">
              <div className="kicker">{t.bookingKicker}</div>
              <h2>{t.bookingTitle}</h2>
            </div>

            <form className="form" onSubmit={handleBookingSubmit}>
              <input type="hidden" name="website" tabIndex={-1} autoComplete="off" />
              <label>
                {t.nameLabel}
                <input name="name" type="text" placeholder={t.namePlaceholder} />
              </label>
              <label>
                {t.contactLabel}
                <input name="contact" type="text" placeholder={t.contactPlaceholder} />
              </label>
              <label>
                {t.serviceLabel}
                <select name="service" defaultValue={t.options[0]}>
                  {t.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                {t.timeLabel}
                <input name="preferredTime" type="text" placeholder={t.timePlaceholder} />
              </label>
              <label>
                {t.messageLabel}
                <textarea name="message" placeholder={t.messagePlaceholder} />
              </label>
              <button className="btn" type="submit" disabled={submissionStatus === "submitting"}>
                {submissionStatus === "submitting" ? t.sending : t.submit}
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
            <h3 id="submit-success-title">{t.successTitle}</h3>
            <p>{t.successLineOne}</p>
            <p>{t.successLineTwo}</p>
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
  children: ReactNode;
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

function Card({ tag, title, children }: { tag?: string; title: string; children: ReactNode }) {
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
  children: ReactNode;
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

function InfoBand({ quote, items }: { quote: string; items: Array<[string, string]> }) {
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

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="contact-row">
      <strong>{label}</strong>
      {children}
    </div>
  );
}

function Footer({ language }: { language: Language }) {
  const t = content[language].footer;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <strong>{t.brand}</strong>
          <br />
          {t.line}
        </div>
        <div>
          <div className="footer-phone">
            <span>{t.phone}</span>
            <span>
              +1 813-748-1290
              <br />
              +1 951-880-7080
            </span>
          </div>
          <br />
          {t.address}
        </div>
      </div>
    </footer>
  );
}

export default App;
