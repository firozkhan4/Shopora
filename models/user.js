import bcrypt from 'bcrypt';
import process from 'process';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      indexes: [{ unique: true, fields: ['email'] }],
      hooks: {
        beforeCreate: hashPasswordHook,
        beforeUpdate: hashPasswordHook,
      },
    }
  );

  User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  User.prototype.comparePassword = async function(plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  };

  return User;
};

async function hashPasswordHook(user) {
  if (user.changed('password')) {
    const saltRounds = parseInt(process.env.SALT || '10');
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
}

