import user from './user.js';
import maintype from './maintype.js';
import section from './section.js';
import course from './course.js';
import tag from './tag.js';
import detail from './detail.js';
import chapter from './chapter.js';
import lesson from './lesson.js';

var admin = async (server) => {
    server.register(user, { prefix: 'user' });
    server.register(maintype, { prefix: 'maintype' });
    server.register(section, { prefix: 'section' });
    server.register(course, { prefix: 'course' });
    server.register(tag, { prefix: 'tag' });
    server.register(detail, { prefix: 'detail' });
    server.register(chapter, { prefix: 'chapter' });
    server.register(lesson, { prefix: 'lesson' });
};

export { admin as default };
