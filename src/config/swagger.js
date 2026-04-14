const path = require('path');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task Manager API',
        version: '1.0.0',
        description: 'Simple Express API with auth, tasks, validation, and role-based access control'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5000}`,
          description: 'Local development server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        },
        schemas: {
          ErrorResponse: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean',
                example: false
              },
              message: {
                type: 'string',
                example: 'Bad input'
              },
              error: {
                type: 'string',
                example: 'Email is required'
              }
            }
          },
          User: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '661b6f9d1d09e53d2c9b1234'
              },
              name: {
                type: 'string',
                example: 'Smith'
              },
              email: {
                type: 'string',
                example: 'smith@example.com'
              },
              role: {
                type: 'string',
                example: 'user'
              }
            }
          },
          LoginUser: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '661b6f9d1d09e53d2c9b1234'
              },
              email: {
                type: 'string',
                example: 'smith@example.com'
              },
              role: {
                type: 'string',
                example: 'user'
              }
            }
          },
          Task: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '661b70391d09e53d2c9b5678'
              },
              title: {
                type: 'string',
                example: 'Finish backend assignment'
              },
              description: {
                type: 'string',
                example: 'Build CRUD APIs with auth and validation'
              },
              userId: {
                type: 'string',
                example: '661b6f9d1d09e53d2c9b1234'
              }
            }
          },
          RegisterRequest: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
              name: {
                type: 'string',
                example: 'Smith'
              },
              email: {
                type: 'string',
                example: 'smith@example.com'
              },
              password: {
                type: 'string',
                example: 'secret123'
              }
            }
          },
          LoginRequest: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                example: 'smith@example.com'
              },
              password: {
                type: 'string',
                example: 'secret123'
              }
            }
          },
          CreateTaskRequest: {
            type: 'object',
            required: ['title'],
            properties: {
              title: {
                type: 'string',
                example: 'Learn Joi validation'
              },
              description: {
                type: 'string',
                example: 'Add request validation to task APIs'
              }
            }
          },
          UpdateTaskRequest: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                example: 'Update backend docs'
              },
              description: {
                type: 'string',
                example: 'Improve Swagger documentation'
              }
            }
          }
        }
      }
    },
    apis: [path.join(__dirname, '../routes/*.js')]
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
