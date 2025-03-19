import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const errorResponse =
        exception instanceof HttpException
          ? exception.getResponse()
          : { message: 'Internal server error', data: null };

          const errorMessage =
          typeof errorResponse === 'string'
            ? errorResponse
            : errorResponse['message'] || 'Internal server error';
    
        const errorData = errorResponse['data'] || null;
  
      response.status(status).json({
        success: false,
        error: {
            message: errorMessage,
            data: errorData,
          },
        timestamp: new Date().toISOString(),
      });
    }
  }
  