import { OperationModel } from 'src/common/v1/model/operation.model';
import operationSeed from '../../../common/seeds/operation.seed/seed.json';

require('dotenv').config({
    path: '.env.dev',
  });

import { operationBatchWriteService } from "src/common/v1/service/operation.service";
(async () => console.log(await operationBatchWriteService(operationSeed as [OperationModel])))()
