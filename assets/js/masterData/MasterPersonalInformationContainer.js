export class MasterPersonalInformationContainer {
    constructor(masterPersonalInformations) {
      this.masterPersonalInformations = masterPersonalInformations;
    }
  
    getById(masterProjectId) {
      return this.masterPersonalInformations.filter(metaData => metaData.master_project_id === masterProjectId);
    }

    getCurrentInformation()
    {
        return this.masterPersonalInformations[0];
    }
  }