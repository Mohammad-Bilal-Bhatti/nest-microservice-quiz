import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, concatMap, defaultIfEmpty, map, tap, throwError } from "rxjs";
import { Service } from "../shared/available.services";
import { AddFlimDto, UpdateFlimDto } from "./dtos/flim.dto";
import { SearchFlimsInput } from "./dtos/search-flims-input.dto";
import { ErrorCodes } from "./error.codes";

@Controller('flims')
export class FlimsController {

  constructor(@Inject(Service.Flims) private readonly flimsService: ClientProxy) {}
  
  @Patch(':id')
  updateFlim(
    @Param('id', ParseIntPipe) flimId: number,
    @Body() input: UpdateFlimDto
  ) {
    input['id'] = flimId;
    return this.flimsService.send('flim::update', input).pipe(
      catchError(error => {
        throw this.parseRpcErrorToHttpError(error);
      })
    );
  }

  @Delete(':title')
  deleteFlim(@Param('title') flimTitle: string) {
    return this.flimsService.send('flim::findByTitle', { title: flimTitle }).pipe(
      map( data => {
        if (!data) throw new HttpException('flim not found with title', HttpStatus.NOT_FOUND);
        return data.flim;
      }),
      concatMap((flim: any) => {
        return this.flimsService.send('flim::delete', flim);
      }),
    );
  }

  @Get('search')
  searchFilms(@Query() input: SearchFlimsInput) {
    return this.flimsService.send('flim::search', input);
  }

  @Get()
  getAllFlims() {
    return this.flimsService.send('flim::findAll', {});
  }

  @Post()
  addFlim(@Body() input: AddFlimDto) {
    return this.flimsService.send('flim::create', input).pipe(
      catchError(error => {
        throw this.parseRpcErrorToHttpError(error);
      })
    );
  }

  private parseRpcErrorToHttpError(rpcError: { message: string, code: string }) {
    let httpStatus: HttpStatus;
    switch(rpcError.code) {
      case ErrorCodes.Title_Already_Registered: {
        httpStatus = HttpStatus.PRECONDITION_FAILED;
        break;
      }
      default: {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      }
    }

    return new HttpException(rpcError.message, httpStatus);
  }

}