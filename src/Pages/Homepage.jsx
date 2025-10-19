import React from 'react';
import { Sparkles, Lightbulb, Rocket, Zap } from 'lucide-react';

const Home = () => {
  const handleSignIn = () => {
    window.location.href = '/signin';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f3e7ff 0%, #ffffff 50%, #faf5ff 100%)' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 40px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles style={{ color: '#7c3aed' }} size={32} />
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#7c3aed', margin: 0 }}>
            Pitch<span style={{ color: '#222' }}>Craft</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={handleSignIn}
            style={{
              padding: '10px 24px',
              border: '2px solid #7c3aed',
              background: 'white',
              color: '#7c3aed',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#f3e8ff'}
            onMouseOut={(e) => e.target.style.background = 'white'}
          >
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            style={{
              padding: '10px 24px',
              border: 'none',
              background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
              color: 'white',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
        {/* Main Heading */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '64px', fontWeight: '900', color: '#111', margin: '0 0 16px 0', lineHeight: '1.1' }}>
            Transform Your{' '}
            <span style={{
              background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Startup Ideas
            </span>
          </h2>
          <h2 style={{ fontSize: '64px', fontWeight: '900', color: '#111', margin: 0, lineHeight: '1.1' }}>
            Into Reality with AI
          </h2>
        </div>

        {/* Subtitle */}
        <p style={{ fontSize: '20px', color: '#555', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px', lineHeight: '1.6' }}>
          Generate stunning startup names, taglines, and elevator pitches in seconds. 
          Your AI-powered partner for entrepreneurial success.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '80px' }}>
          <button
            onClick={handleSignUp}
            style={{
              padding: '18px 36px',
              border: 'none',
              background: 'linear-gradient(90deg, #7c3aed, #ec4899)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Get Started Free <Rocket size={20} />
          </button>
          <button
            onClick={handleSignIn}
            style={{
              padding: '18px 36px',
              border: '2px solid #7c3aed',
              background: 'white',
              color: '#7c3aed',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.background = '#f3e8ff'}
            onMouseOut={(e) => e.target.style.background = 'white'}
          >
            Sign In
          </button>
        </div>

        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '60px' }}>
          {/* Feature 1 */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s'
          }}>
            <div style={{
              background: '#f3e8ff',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Lightbulb style={{ color: '#7c3aed' }} size={32} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>
              AI-Powered Ideas
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
              Generate creative startup names, taglines, and pitches using advanced AI technology
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s'
          }}>
            <div style={{
              background: '#fce7f3',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Zap style={{ color: '#ec4899' }} size={32} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>
              Instant Results
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
              Get professional-quality branding ideas in seconds, not days or weeks
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            transition: 'all 0.3s'
          }}>
            <div style={{
              background: '#f3e8ff',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Sparkles style={{ color: '#7c3aed' }} size={32} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '12px' }}>
              Unique & Creative
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
              Every idea is tailored to your vision with unique value propositions
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '32px',
        color: '#666',
        borderTop: '1px solid #e9d5ff',
        marginTop: '80px'
      }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()}{' '}
          <span style={{ fontWeight: '700', color: '#7c3aed' }}>PitchCraft</span> — Your AI Startup Partner
        </p>
      </footer>
    </div>
  );
};

export default Home;