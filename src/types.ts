import { Request } from 'express'
import { CorsOptions } from 'cors'
import {
  GraphQLSchema,
  GraphQLFieldResolver,
  GraphQLScalarType,
  GraphQLIsTypeOfFn,
  GraphQLTypeResolver,
  ValidationContext,
} from 'graphql'
import { IDirectiveResolvers, ITypeDefinitions } from 'graphql-tools/dist/Interfaces'
import { ExecutionParams } from 'subscriptions-transport-ws'
import { LogFunction } from 'apollo-server-core'

export interface IResolvers {
  [key: string]: (() => any) | IResolverObject | GraphQLScalarType
}

export type IResolverObject = {
  [key: string]: GraphQLFieldResolver<any, any> | IResolverOptions,
}

export interface IResolverOptions {
  resolve?: GraphQLFieldResolver<any, any>
  subscribe?: GraphQLFieldResolver<any, any>
  __resolveType?: GraphQLTypeResolver<any, any>
  __isTypeOf?: GraphQLIsTypeOfFn<any, any>
}

export type Context = { [key: string]: any }

export interface ContextParameters {
  request: Request
  connection: ExecutionParams
}

export type ContextCallback = (params: ContextParameters) => Context

export interface UploadOptions {
  maxFieldSize?: number
  maxFileSize?: number
  maxFiles?: number
}

export interface TracingOptions {
  mode: 'enabled' | 'disabled' | 'http-header'
}

export interface ApolloServerOptions {
  tracing?: boolean | TracingOptions
  cacheControl?: boolean
  formatError?: Function
  logFunction?: LogFunction
  rootValue?: any
  validationRules?: Array<(context: ValidationContext) => any>
  fieldResolver?: GraphQLFieldResolver<any, any>
  formatParams?: Function
  formatResponse?: Function
  debug?: boolean
}

export interface Options extends ApolloServerOptions {
  port?: number
  cors?: CorsOptions | false
  uploads?: UploadOptions | false
  endpoint?: string
  subscriptions?: SubscriptionServerOptions | string | false
  playground?: string | false
}

export interface SubscriptionServerOptions {
  path?: string
  onConnect?: Function
  onDisconnect?: Function
  keepAlive?: number
}

export interface Props {
  directiveResolvers?: IDirectiveResolvers<any, any>
  typeDefs?: ITypeDefinitions
  resolvers?: IResolvers
  schema?: GraphQLSchema
  context?: Context | ContextCallback
}

export interface LambdaProps {
  directiveResolvers?: IDirectiveResolvers<any, any>
  typeDefs?: string
  resolvers?: IResolvers
  schema?: GraphQLSchema
  context?: Context | ContextCallback
  options?: LambdaOptions
}

export interface LambdaOptions extends ApolloServerOptions {
  endpoint?: string
}
