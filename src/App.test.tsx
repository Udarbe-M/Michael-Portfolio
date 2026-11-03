import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('portfolio', () => {
  it('renders recruiter-facing navigation and downloadable résumé links', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /building software that turns/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument()

    const resumeLinks = screen.getAllByRole('link', { name: /résumé/i })
    expect(resumeLinks).toHaveLength(2)
    resumeLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/Michael-Udarbe-Resume.pdf')
      expect(link).toHaveAttribute('download')
    })
  })

  it('opens project details and restores focus when dismissed with Escape', async () => {
    const user = userEvent.setup()
    render(<App />)

    const trigger = screen.getByRole('button', { name: /view details for nullpix/i })
    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'NullPix' })
    expect(dialog).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /view repository/i })).not.toBeInTheDocument()
    expect(screen.getByText(/project details available on request/i)).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it('keeps public external links isolated from the current tab', () => {
    const { container } = render(<App />)
    const externalLinks = [...container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')]

    expect(externalLinks.length).toBeGreaterThan(0)
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })
})
