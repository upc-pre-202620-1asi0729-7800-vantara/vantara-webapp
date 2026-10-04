/**
 * Marker interface for HTTP response envelopes returned by API endpoints.
 */
export interface BaseResponse {}

/**
 * Base contract for API resources that expose a string identifier.
 */
export interface BaseResource {
  /**
   * The unique identifier for the resource.
   */
  id: string;
}
