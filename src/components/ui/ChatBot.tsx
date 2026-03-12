'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, User, Home, Phone } from 'lucide-react'
import { projects } from '@/data/projects'
import { getProjectWhatsAppLink } from '@/lib/utils'

interface Message {
  id: number
  role: 'bot' | 'user'
  text: string
  options?: string[]
}

type ChatStep = 'greeting' | 'ask-name' | 'ask-project' | 'ask-phone' | 'project-info' | 'done'

function getProjectSlug(text: string) {
  const msg = text.toLowerCase()

  if (msg.includes('sree') || msg.includes('laxmi') || msg.includes('balaji')) {
    return 'sree-laxmi-balaji-township'
  }

  if (msg.includes('infiniti') || msg.includes('counti')) {
    return 'infiniti-counti'
  }

  return ''
}

const getBotResponse = (userMsg: string, step: ChatStep, name: string): { text: string; options?: string[]; nextStep: ChatStep } => {
  const msg = userMsg.toLowerCase()

  if (step === 'greeting') {
    return {
      text: `Hello! 👋 I'm GEM Assistant. I can help you with project details, pricing, and site visits. What's your name?`,
      nextStep: 'ask-name',
    }
  }

  if (step === 'ask-name') {
    return {
      text: `Nice to meet you, ${userMsg}! 😊 Which project are you interested in?`,
      options: ['Sree Laxmi Balaji Township', 'Infiniti Counti', 'Tell me about both'],
      nextStep: 'ask-project',
    }
  }

  if (step === 'ask-project') {
    if (msg.includes('sree') || msg.includes('laxmi') || msg.includes('balaji')) {
      return {
        text: `Sree Laxmi Balaji Township is a 46-acre DTCP & RERA approved community in Shadnagar with 578 plots (165–440 sq yds). Starting at ₹18,500/sq yd.\n\n✅ RERA Approved\n🏛️ Clubhouse & Pool\n🛣️ Near NH-44`,
        options: ['Pricing Details', 'Book Site Visit', 'Location?'],
        nextStep: 'project-info',
      }
    }
    if (msg.includes('infiniti') || msg.includes('counti')) {
      return {
        text: `Infiniti Counti is a mega 100-acre gated community on NH-65 near Sadashivpet. Priced at ₹22,000/sq yd.\n\n🏰 40,000 sqft Clubhouse\n📍 Near NIMZ SEZ\n🎓 Near Woxsen University`,
        options: ['Pricing Details', 'Book Site Visit', 'Location?'],
        nextStep: 'project-info',
      }
    }
    return {
      text: `We have two premium projects:\n\n1. Sree Laxmi Balaji Township — Shadnagar, NH-44\n2. Infiniti Counti — Sadashivpet, NH-65\n\nWhich interests you?`,
      options: ['Sree Laxmi Balaji', 'Infiniti Counti'],
      nextStep: 'ask-project',
    }
  }

  if (step === 'project-info') {
    if (msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
      return {
        text: `Current pricing:\n\n• Sree Laxmi Balaji: ₹18,500/sq yd onwards\n• Infiniti Counti: ₹22,000/sq yd\n\nBank loans are available from leading banks. Can I get your mobile number to share detailed brochures?`,
        nextStep: 'ask-phone',
      }
    }
    if (msg.includes('location') || msg.includes('where')) {
      return {
        text: `📍 Sree Laxmi Balaji: Shadnagar, 45 mins from Hyderabad Airport, near NH-44\n\n📍 Infiniti Counti: Sadashivpet, near NH-65 Mumbai Highway & Regional Ring Road`,
        options: ['Book Site Visit', 'Pricing?', 'Amenities?'],
        nextStep: 'project-info',
      }
    }
    if (msg.includes('visit') || msg.includes('book') || msg.includes('site')) {
      return {
        text: `Great choice! ${name}, may I have your mobile number to confirm your site visit?`,
        nextStep: 'ask-phone',
      }
    }
    if (msg.includes('amenit')) {
      return {
        text: `Our projects offer:\n🏛️ Grand Clubhouse\n🏊 Swimming Pool\n🌳 Landscaped Parks\n🛡️ 24/7 Security\n🛣️ Wide Roads\n⚡ Underground Utilities`,
        options: ['Book Site Visit', 'Pricing?'],
        nextStep: 'project-info',
      }
    }
  }

  if (step === 'ask-phone') {
    return {
      text: `Thank you, ${name}! 🎉 Our team will call you at ${userMsg} within 2 hours to schedule your free site visit.\n\nYou can also WhatsApp us directly for immediate assistance!`,
      options: ['WhatsApp Now'],
      nextStep: 'done',
    }
  }

  return {
    text: `I can help you with project details, pricing, amenities, and site visits. What would you like to know?`,
    options: ['Projects', 'Pricing', 'Amenities', 'Book Visit'],
    nextStep: step,
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState<ChatStep>('greeting')
  const [userName, setUserName] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [started, setStarted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isResponding, setIsResponding] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const startChat = () => {
    setStarted(true)
    setSubmitError('')
    setSelectedProject('')
    setIsResponding(false)
    const response = getBotResponse('', 'greeting', '')
    setMessages([{ id: 1, role: 'bot', text: response.text, options: response.options }])
    setStep(response.nextStep)
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || isResponding) return

    const currentStep = step
    const nextUserName = currentStep === 'ask-name' ? text : userName
    const nextProject = currentStep === 'ask-project' ? getProjectSlug(text) : selectedProject

    const userMsg: Message = { id: Date.now(), role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setSubmitError('')
    setIsResponding(true)

    if (currentStep === 'ask-name') setUserName(text)
    if (currentStep === 'ask-project') {
      setSelectedProject(nextProject)
    }

    setTimeout(() => {
      const response = getBotResponse(text, currentStep, nextUserName || text)
      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: response.text,
        options: response.options,
      }
      setMessages((prev) => [...prev, botMsg])
      setStep(response.nextStep)
      setIsResponding(false)
    }, 600)

    if (currentStep === 'ask-phone') {
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nextUserName || 'Chat Visitor',
            phone: text,
            project: nextProject || null,
            source: 'chatbot',
            message: messages
              .map((message) => `${message.role === 'bot' ? 'Bot' : 'User'}: ${message.text}`)
              .join('\n'),
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Unable to submit chat lead.')
        }
      } catch (error) {
        const detail =
          error instanceof Error ? error.message : 'Unable to submit chat lead right now.'

        setSubmitError(detail)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            role: 'bot',
            text: `I could not save your details yet. ${detail}`,
          },
        ])
      }
    }
  }

  const latestBotMessageId = [...messages]
    .reverse()
    .find((message) => message.role === 'bot' && message.options?.length)?.id

  return (
    <>
      {/* Trigger button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setOpen(!open); if (!started) startChat() }}
        className="fixed bottom-20 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-luxury transition-colors hover:bg-primary-deep sm:bottom-24 sm:right-6 sm:h-12 sm:w-12"
        aria-label="Open Chat"
      >
        {open ? <X size={18} /> : <Bot size={18} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="chatbot-widget"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-deep to-primary px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-semibold text-white text-sm">GEM Assistant</div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-white/60 text-xs font-body">Online</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/60 hover:text-white">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="bg-white h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                    msg.role === 'bot' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'
                  }`}>
                    {msg.role === 'bot' ? <Bot size={12} /> : <User size={12} />}
                  </div>
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                    <div className={`px-3 py-2 rounded-sm text-xs font-body leading-relaxed whitespace-pre-line ${
                      msg.role === 'bot'
                        ? 'bg-light-gray text-dark'
                        : 'bg-primary text-white'
                    }`}>
                      {msg.text}
                    </div>
                    {msg.options && msg.id === latestBotMessageId && (
                      <div className="flex flex-wrap gap-1">
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            disabled={isResponding}
                            onClick={() => opt === 'WhatsApp Now'
                              ? window.open(getProjectWhatsAppLink('GEM Group Projects'), '_blank')
                              : sendMessage(opt)
                            }
                            className="text-xs bg-primary/10 hover:bg-primary text-primary hover:text-white px-2 py-1 rounded-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {submitError ? (
                <div className="rounded-sm bg-red-50 px-3 py-2 font-body text-xs leading-relaxed text-red-600">
                  {submitError}
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Type a message..."
                disabled={isResponding}
                className="flex-1 text-xs font-body border border-gray-200 rounded-sm px-3 py-2 focus:outline-none focus:border-primary"
              />
              <button
                disabled={isResponding}
                onClick={() => sendMessage(input)}
                className="w-8 h-8 bg-primary text-white rounded-sm flex items-center justify-center hover:bg-primary-deep transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
