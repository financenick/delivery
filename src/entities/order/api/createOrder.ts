import type {
  CreateOrderRequestDto,
  CreateOrderResponseDto,
} from './contracts'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

type ProblemDetailsDto = {
  detail?: string
  title?: string
}

export class CreateOrderError extends Error {
  status: number
  detail: string | null

  constructor(message: string, status: number, detail: string | null = null) {
    super(message)
    this.name = 'CreateOrderError'
    this.status = status
    this.detail = detail
  }
}

export async function createOrder(
  payload: CreateOrderRequestDto,
): Promise<CreateOrderResponseDto> {
  if (!API_BASE_URL) {
    throw new CreateOrderError('Не настроен адрес API для оформления заказа', 0)
  }

  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new CreateOrderError('Не удалось отправить запрос на оформление заказа', 0)
  }

  if (!response.ok) {
    const problemDetails = await readProblemDetails(response)

    throw new CreateOrderError(
      problemDetails?.detail ||
        problemDetails?.title ||
        `Не удалось оформить заказ. Код ответа: ${response.status}`,
      response.status,
      problemDetails?.detail ?? null,
    )
  }

  return response.json() as Promise<CreateOrderResponseDto>
}

async function readProblemDetails(
  response: Response,
): Promise<ProblemDetailsDto | null> {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    return null
  }

  try {
    return (await response.json()) as ProblemDetailsDto
  } catch {
    return null
  }
}
