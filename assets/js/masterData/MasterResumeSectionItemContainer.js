export class MasterResumeSectionItemContainer {
  constructor(masterResumeSections) {
    this.masterResumeSections = masterResumeSections;
  }
  
  getAll()
  {
    return this.masterResumeSections;
  }

  getListByMasterResumeGroupIndexer(master_resume_group_id) {
    return this.masterResumeSections.filter(x => x.master_resume_group_id === master_resume_group_id);
  }
}