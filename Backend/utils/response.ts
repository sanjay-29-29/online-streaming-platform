/* eslint-disable @typescript-eslint/no-explicit-any */

export class GeneralResponse {
    success: boolean;
    statusCode: number;
    message?: string;
    data: any;
  
    constructor(
      success: boolean,
      data: any,
      statuCode = 200,
      message?: string
    ) {
      this.success = success;
      this.statusCode = statuCode;
      this.message = message ?? 'Success';
      this.data = data;
    }
  }
  