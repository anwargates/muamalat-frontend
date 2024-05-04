import { create } from 'zustand'

export const useAgentStore = create((set) => ({
  isLogin: false,
  loginName: '',
  agents: [],
  filterRole: '',
  filterName: '',
  setAgents: (agents) => set({ agents }),
  setFilterRole: (role) => set({ filterRole: role }),
  setFilterName: (name) => set({ filterName: name }),
  setIsLogin: (login) => set({ isLogin: login }),
  setLoginName: (loginName) => set({ loginName: loginName }),
}))
