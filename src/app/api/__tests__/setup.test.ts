import { jest } from '@jest/globals'
import { mockFetch } from './setup.mjs'

describe('Test Setup', () => {
  it('configures global mocks correctly', () => {
    // Test fetch mock
    expect(global.fetch).toBeDefined()
    expect(mockFetch.mock).toBeDefined()

    // Test Request, Response, Headers
    expect(global.Request).toBeDefined()
    expect(global.Response).toBeDefined()
    expect(global.Headers).toBeDefined()
    expect(global.Blob).toBeDefined()

    // Test environment variables
    expect(process.env.DEEP_INFRA_API_KEY).toBe('test-deep-infra-key')
  })

  it('mocks fetch with correct response format', async () => {
    const response = await global.fetch('test-url')
    const data = await response.json()
    
    expect(data).toEqual({
      choices: [{
        message: {
          content: 'Test response'
        }
      }]
    })
  })

  it('mocks fetch blob response correctly', async () => {
    const response = await global.fetch('https://api-inference.huggingface.co/test')
    const blob = await response.blob()
    
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('image/png')
    
    const arrayBuffer = await blob.arrayBuffer()
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer)
  })
}) 