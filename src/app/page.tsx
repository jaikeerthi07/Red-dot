import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import About from '@/components/sections/About'
// import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import VoiceAgentButton from '@/components/chat/VoiceAgentButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        {/* <Testimonials /> */}
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <VoiceAgentButton />
    </div>
  )
}