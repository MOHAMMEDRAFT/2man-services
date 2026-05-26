import React, { useEffect, useState } from 'react';

function App() {
  // تتبع اللغة الحالية: 'ar' للعربية، و 'en' للإنجليزية
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');

  // نصوص التطبيق باللغتين
  const translations = {
    ar: {
      title: "2man Services",
      loadingSdk: "جاري الاتصال بـ Pi SDK...",
      connected: "متصل بنجاح عبر Pi Testnet",
      demoMode: "جاهز للعمل (بيئة تجريبية)",
      simulation: "وضع المحاكاة المحلية",
      welcome: "مرحبًا بك في تطبيقك المحلي",
      welcomeUser: "مرحبًا بك: ",
      deliveryBtn: "🟢 طلب توصيل من محل (بقالة / صيدلية)",
      deliveryAlert: "🟢 تم تفعيل نظام الطلبات المباشر! اختر نوع المحل والطلب وسيتم ربطك بأقرب سائق في منطقتك.",
      sectionTitle: "جميع الخدمات المتاحة للقرى والمدن",
      service1: "🛒 بقالة وعطارة",
      service2: "💊 صيدليات وعلاج",
      service3: "🛠️ صيانة وورش",
      service4: "🛺 طلب أقرب مواصلة",
      langBtn: "English 🌐"
    },
    en: {
      title: "2man Services",
      loadingSdk: "Connecting to Pi SDK...",
      connected: "Successfully connected via Pi Testnet",
      demoMode: "Ready (Demo Environment)",
      simulation: "Local Simulation Mode",
      welcome: "Welcome to your local app",
      welcomeUser: "Welcome: ",
      deliveryBtn: "🟢 Request Delivery (Grocery / Pharmacy)",
      deliveryAlert: "🟢 Direct order system activated! Choose the store type and order, and you will be connected to the nearest driver.",
      sectionTitle: "All Services Available for Villages & Cities",
      service1: "🛒 Grocery & Herbs",
      service2: "💊 Pharmacies & Meds",
      service3: "🛠️ Maintenance & Shops",
      service4: "🛺 Request Nearest Ride",
      langBtn: "العربية 🌐"
    }
  };

  const t = translations[lang];

  useEffect(() => {
    // تعيين الرسالة الافتراضية بناءً على اللغة
    if (!username) setUsername(t.welcome);
    if (!status) setStatus(t.loadingSdk);

    try {
      if ((window as any).Pi) {
        const Pi = (window as any).Pi;
        Pi.init({ version: "2.0", sandbox: true });
        
        Pi.authenticate(["username"], function(payment: any) {
          console.log("Payment incomplete:", payment);
        })
        .then(function(auth: any) {
          setUsername(`${t.welcomeUser}${auth.user.username}`);
          setStatus(t.connected);
        })
        .catch(function(error: any) {
          console.error(error);
          setStatus(t.demoMode);
        });
      }
    } catch (err) {
      setStatus(t.simulation);
    }
  }, [lang]);

  // دالة تبديل اللغة
  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleDeliveryClick = () => {
    alert(t.deliveryAlert);
  };

  // التحكم في اتجاه الصفحة بناءً على اللغة (RTL للعربى، LTR للإنجليزي)
  const isRtl = lang === 'ar';

  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', direction: isRtl ? 'rtl' : 'ltr', padding: '0 0 20px 0', transition: 'all 0.3s ease' }}>
      
      {/* الهيدر العلوي المحتوي على العنوان وزر تغيير اللغة */}
      <div style={{ backgroundColor: '#5b2c6f', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
          {t.title}
        </div>
        {/* زر تبديل اللغة الذكي */}
        <button 
          onClick={toggleLanguage}
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {t.langBtn}
        </button>
      </div>

      <div style={{ padding: '20px' }}>
        {/* كارت الحساب والشبكة */}
        <div style={{ background: 'linear-gradient(135deg, #8e44ad, #5b2c6f)', color: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', marginBottom: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>{lang === 'ar' ? 'حالة الاتصال بالشبكة' : 'Network Connection Status'}</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>{status}</div>
          <div style={{ fontSize: '14px' }}>{username}</div>
        </div>

        {/* زر التوصيل الأخضر الكبير */}
        <button 
          onClick={handleDeliveryClick}
          style={{ backgroundColor: '#27ae60', color: 'white', textAlign: 'center', padding: '15px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', display: 'block', marginBottom: '25px', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)', border: 'none', width: '100%', cursor: 'pointer' }}
        >
          {t.deliveryBtn}
        </button>

        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#5b2c6f' }}>
          {t.sectionTitle}
        </div>
        
        {/* شبكة الخدمات الأربعة المترجمة بالكامل */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontWeight: 'bold', color: '#444' }}>
            {t.service1}
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontWeight: 'bold', color: '#444' }}>
            {t.service2}
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontWeight: 'bold', color: '#444' }}>
            {t.service3}
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontWeight: 'bold', color: '#444' }}>
            {t.service4}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

