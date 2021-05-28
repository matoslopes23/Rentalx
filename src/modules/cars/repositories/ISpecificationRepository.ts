
interface ICreateSpecificationDTO{
    name:string;
    description:string;
}

interface ISpecificationRepository {
    create({description, name}: ICreateSpecificationDTO): void
    findByName(name:string)
}

export {ISpecificationRepository, ICreateSpecificationDTO}