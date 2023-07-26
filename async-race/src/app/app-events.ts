enum AppEvents {
  SwitchView = 'switch-view',
  CarCreate = 'car-create',
  CarCreated = 'car-created',
  CarUpdate = 'car-update',
  CarUpdated = 'car-updated',
  CarDelete = 'car-delete',
  CarDeleted = 'car-deleted',
  PageLoad = 'cars-page-load',
  GenerateCars = 'generate-cars',
  CarsGenerated = 'cars-generated',
  CarToggleEngine = 'car-toggle-engine',
  CarEngineToggled = 'car-engine-toggled',
  RequestCarDrive = 'request-car-drive',
  ResponseCarDrive = 'response-car-drive',
  CarFinished = 'car-finished',
  CarBroke = 'car-broke',
  UpdateWinner = 'update-winner',
  RequestTotalCars = 'get-total-cars',
  ResponseTotalCars = 'show-total-cars',
}

export default AppEvents;
