import uuid from 'uuid'
import * as dynamoDbLib from './libs/dynamodb-lib'
import { success, failure } from './libs/response-lib'

export async function main(event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: 'yoga-dev',
    Item: {
      asanaId: uuid.v1(),
      title: data.title,
      duration: data.duration,
      description: data.description,
      createdAt: new Date().getTime(),
    },
  }

  try {
    const result = await dynamoDbLib.call('put', params)
    callback(null, success(params.Item))
  }
  catch(e) {
    callback(null, failure({status: false}))
  }
}