import { GET_INDEX_CONFIG } from './URL_CONSTANT'

export interface ResponseType {
  [GET_INDEX_CONFIG]: { isTest: boolean }
  [key: string]: any
}
