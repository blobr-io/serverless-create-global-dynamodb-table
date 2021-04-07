const helper = require('./helper');

/**
 * The class that will be used as serverless plugin.
 */
class CreateGlobalDynamodbTable {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    const { replica } = options;
    if (replica === 'true') {
      this.hooks = {
        'after:deploy:deploy': () =>
          helper.createGlobalDynamodbTable(serverless),
        'removeGlobalTable:remove': () => helper.deleteGlobalTable(serverless),
      };

      this.commands = {
        removeGlobalTable: {
          usage: 'removes the replica previously created',
          lifecycleEvents: ['remove'],
        },
      };
    }
  }
}

module.exports = CreateGlobalDynamodbTable;
