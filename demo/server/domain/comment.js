/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'content'
		},
		upvotes: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue:0,
			field: 'upvotes',
			comment:'赞同数',
		},
		downvotes: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue:0,
			field: 'downvotes',
			comment:'反对数',
		},
		authorId: {
			type: DataTypes.BIGINT,
			allowNull: null,
			field: 'author_id',
			comment:'作者ID',
		},
		scope:{
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue:'post',
			field: 'scope',
			comment:'本分类信息所属的领域，比如post、movie、book',
		},
		topicId: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'topic_id',
			comment:'主题ID，如文章、电影等',
		},
		replyTo: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'reply_to',
			comment:'回复的某评论ID',
		},
		replyUnder:{
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'reply_under',
			comment:'回复的某评论ID，NULL表示是顶级评论，回复于顶级评论或者回复于其他评论的回复必须指定此字段',
		}
	}, {
		tableName: 'comment'
	});
};
