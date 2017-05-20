/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('topicUserOpinion', {
		scope:{
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue:'post',
			field: 'scope',
			comment:'用户意见信息所属的领域，比如comment、某些类型的文章',
		},
		topicId: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'topic_id',
			comment:'用户意见主体的ID',
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'user_id',
			comment:'用户ID',
		},
		opinion: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'opinion',
			comment:'意见，字符串：赞同、感谢、反对、无益,etc.'
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'note',
			comment:'备注',
		}
	}, {
		tableName: 'topic_user_opinion'
	});
};
