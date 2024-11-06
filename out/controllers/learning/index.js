import fs from 'fs';
import path from 'path';

const getVideo = async (request, reply) => {
    const lessonId = request.params.lesson_id;
    const videoPath = path.join(`./stores/Video_Lesson/lesson/${lessonId}/lesson_video.mp4`); // Path to the video file
    // Check if the file exists
    // Set the appropriate headers for streaming video
    reply.header('Content-Type', 'video/mp4');
    reply.header('Content-Disposition', `inline; filename="lesson_video.mp4"`);
    // Create a readable stream from the video file
    const videoStream = fs.createReadStream(videoPath);
    // Pipe the video stream to the response
    //   reply.send(videoStream);
    await reply.send(videoStream);
};

export { getVideo };
