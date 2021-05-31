import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum PageSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(PageSortDirection, { name: 'PageSortDirection' });

export type Pagination = {
  page?: number;
  count?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
  q?: string;
};

// graphql types
@InputType()
export class PaginationInput {
  @Field({ nullable: true, defaultValue: 1 })
  page: number;

  @Field({ nullable: true, defaultValue: 20 })
  count: number;

  @Field({ nullable: true })
  sortBy: string;

  @Field(() => PageSortDirection, { nullable: true })
  sortDirection: PageSortDirection;

  @Field({ nullable: true })
  q: string;
}