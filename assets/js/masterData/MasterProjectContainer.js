export class MasterProjectContainer  {
  constructor(masterProjects) {
    this.masterProjects = masterProjects;
  }

  getById(master_project_id) {
    return this.masterProjects.find(metaData => metaData.master_project_id === master_project_id);
  }

  getAll()
  {
    return this.masterProjects;
  }
}