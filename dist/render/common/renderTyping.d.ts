import { GraphQLInputType, GraphQLOutputType } from 'graphql'
export declare const renderTyping: (
  type: GraphQLOutputType | GraphQLInputType,
  undefinableValues: boolean,
  undefinableFields: boolean,
  root?: boolean,
) => string
