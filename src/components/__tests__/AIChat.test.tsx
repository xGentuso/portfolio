import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AIChat from '../AIChat'

describe('AIChat Component', () => {
  it('renders the chat interface', () => {
    render(<AIChat />)
    
    // Check for main elements
    expect(screen.getByText('Deep Infra AI')).toBeInTheDocument()
    expect(screen.getByText('Llama-2-70b LLM')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
  })

  it('allows switching between chat and image modes', async () => {
    render(<AIChat />)
    
    // Initial state should be chat mode
    expect(screen.getByText('AI Assistant')).toBeInTheDocument()
    
    // Find and click the image generation card
    const imageCard = screen.getByText('Hugging Face').closest('div')
    fireEvent.click(imageCard!)
    
    // Should switch to image generation mode
    await waitFor(() => {
      expect(screen.getByText('Image Generation')).toBeInTheDocument()
    })
  })

  it('handles user input in chat mode', async () => {
    render(<AIChat />)
    
    // Find the input by its role
    const input = screen.getByRole('textbox')
    const sendButton = screen.getByRole('button', { name: /send/i })

    // Type a message
    await userEvent.type(input, 'Hello AI')
    expect(input).toHaveValue('Hello AI')

    // Send button should be enabled
    expect(sendButton).not.toBeDisabled()
  })

  it('renders the message input interface', () => {
    render(<AIChat />)
    
    // Check for input elements
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
}) 