import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @ApiProperty()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @ApiProperty()
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;
}