export class CreateChannelDto {
  readonly name: string;
  readonly url: string;
  readonly monitoring: boolean;
  readonly providerId: number;
}

export class EditChannelDto extends CreateChannelDto {
  constructor() {
    super();
  }
  readonly id: number;
}
