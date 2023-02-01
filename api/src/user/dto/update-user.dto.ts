import { User } from "../user.entity";

export class UpdateUserRequestDTO extends User{}

export class RegistrationSuccededResponseDTO {
    id: number;
    status: string = "success";
}

export class RegistrationFailedResponseDTO {
    reason: string;
    status: string = "faliure";
}