import React, { useEffect, useState } from 'react'
import MainCard from '../components/cards/MainCard'
import { useAgentStore } from '../global/store'
import MainModal from '../components/modals/MainModal'

function Home() {
  const { agents, filterRole, filterName, loginName } = useAgentStore()

  const filteredAgents = agents.filter((agent) => {
    const roleMatches =
      filterRole !== ''
        ? agent.role.toLowerCase() === filterRole.toLowerCase()
        : true
    const nameMatches =
      filterName !== ''
        ? agent.displayName.toLowerCase().includes(filterName.toLowerCase())
        : true
    return roleMatches && nameMatches
  })

  const [isOpen, setIsOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState({})

  const openModal = (agent) => {
    setSelectedAgent(agent)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <section className='min-h-[50vh] bg-[#e4e1d8]'>
        <div className='container max-w-7xl mx-auto py-16 md:px-16 '>
          <h2 className='font-bold text-2xl mb-8 text-center uppercase'>
            Welcome, {loginName}
          </h2>
          <h2 className='font-bold text-2xl mb-20 text-center uppercase'>
            {filterRole === '' && filterName === ''
              ? 'Valorant Heroes'
              : filterName !== ''
              ? 'Search for hero: ' + filterName
              : 'Filter by role: ' + filterRole}
          </h2>
          <div className='flex gap-2 flex-wrap items-stretch justify-center'>
            {filteredAgents.map((agent, index) => (
              <div
                key={index}
                onClick={() => openModal(agent)}>
                <MainCard
                  key={index}
                  agent={agent}
                />
              </div>
            ))}
          </div>
        </div>
        <MainModal
          isOpen={isOpen}
          closeModal={closeModal}
          agent={selectedAgent}
        />
      </section>
    </>
  )
}

export default Home
