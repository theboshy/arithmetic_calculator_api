interface Property {
    [key: string]: any;
  }
  
  interface PutRequest {
    Item: Property;
  }
  
  interface Operation {
    PutRequest: PutRequest;
  }
  
  export interface PropertiesRequestItems {
    Operation: Operation[];
  }
  
  //no puede ser generico?
  export const convertToRequestItems = (properties: Property[]): PropertiesRequestItems  => {
    const operations: Operation[] = properties.map((property: Property) => {
      const putRequest: PutRequest = {
        Item: property,
      };
      const operation: Operation = {
        PutRequest: putRequest,
      };
      return operation;
    });
    const requestItems: PropertiesRequestItems = {
      Operation: operations,
    };
    return requestItems;
  }
  