export class MasterProjectMetaDataContainer {
  constructor(projectMetaDatas) {
    this.projectMetaDatas = projectMetaDatas;
  }

  getListByMasterProjectIndexer(masterProjectId) {
    return this.projectMetaDatas.filter(metaData => metaData.master_project_id === masterProjectId);
  }
}