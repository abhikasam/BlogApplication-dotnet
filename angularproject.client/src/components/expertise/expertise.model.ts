
export class ExpertiseSector implements ExpertiseSector {
  constructor(
    public iD: number = 0,
    public sectorName: string = '',
    public sectorDescription: string = '',
    public isActive: boolean = false,
    public sectorType: string = '',
    public depth: number = 0,
    public createdOn: string = '',
    public updatedOn: string = '',
    public updatedByUser: number = 0,
    public expertiseGroupId: number = 0,
    public malingListDisplayName: string = '',
    public graphId: string = '',
    public emailId: string = '',
    public parentDLDisplayName: string = '',
    public parentDLEmailId: string = '',
    public childExpertises: ExpertiseSector[]=[]
  ) {
  }
}
