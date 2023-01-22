export default interface Job {
  id: number
  jobLink: string
  title: string
  company: string
  companyLogo: string
  location: string
  contract: string[]
  tags?: string[],
  active?: boolean
  createdAt?: string
}
