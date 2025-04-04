import { jest } from '@jest/globals'
import fetch, { Request, Response, Headers } from 'node-fetch'

// Create a mock Response class that extends node-fetch Response
class MockResponse extends Response {
  constructor(body, init) {
    super(body, init)
    this._body = body
    this._init = init || {}
  }

  json() {
    if (typeof this._body === 'string') {
      return Promise.resolve(JSON.parse(this._body))
    }
    return Promise.resolve(this._body)
  }

  get status() {
    return this._init.status || 200
  }

  get headers() {
    return new Headers(this._init.headers || {})
  }

  blob() {
    return Promise.resolve(new MockBlob([this._body], { type: this._init.headers?.['Content-Type'] || 'application/json' }))
  }
}

// Create a mock Blob with arrayBuffer support
class MockBlob extends Blob {
  async arrayBuffer() {
    return new ArrayBuffer(0)
  }
}

// Set up global mocks
global.Request = Request
global.Response = MockResponse
global.Headers = Headers
global.Blob = MockBlob

// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body, init) => new MockResponse(JSON.stringify(body), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    }),
  },
}))

// Mock fetch with proper response format
global.fetch = jest.fn((url) => {
  // If the URL contains 'huggingface', return appropriate response
  if (url.includes('huggingface')) {
    if (url.includes('Mistral-7B-Instruct')) {
      // For chat endpoint
      return Promise.resolve(new MockResponse(JSON.stringify([{
        generated_text: 'Test response'
      }]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    } else {
      // For image endpoint
      const imageData = Buffer.from('test-image-data').toString('base64');
      return Promise.resolve(new MockResponse(imageData, {
        status: 200,
        headers: { 'Content-Type': 'image/png' }
      }));
    }
  }
  
  // If testing error case
  if (global.mockApiError) {
    return Promise.reject(new Error('Failed to process request'));
  }
  
  // Default JSON response
  return Promise.resolve(new MockResponse(JSON.stringify({
    error: 'Unexpected URL'
  }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  }));
});

// Set up environment variables
process.env.HUGGING_FACE_API_KEY = 'test-huggingface-key';

// Export test utilities
export const mockFetch = global.fetch; 