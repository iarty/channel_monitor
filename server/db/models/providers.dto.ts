export class CreateProviderDto {
  readonly name: string;
}

export class EditProviderDto extends CreateProviderDto {
  constructor() {
    super();
  }
  readonly id: number;
}
