export class CreateServerDto {
  readonly name: string;
}

export class EditServerDto extends CreateServerDto {
  constructor() {
    super();
  }
  readonly id: number;
}
