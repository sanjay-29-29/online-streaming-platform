import ffmpegPath from 'ffmpeg-static';
import ffmpegLib from 'fluent-ffmpeg';
import ffprobePath from 'ffprobe-static';
import fs from 'fs/promises';
import path from 'path';
import { FfmpegCommand } from 'fluent-ffmpeg';

class Ffmpeg {
  constructor() {
    if (!ffmpegPath) {
      throw new Error('Ffmpeg is not installed or path is not resolved');
    }
    ffmpegLib.setFfmpegPath(ffmpegPath);
    ffmpegLib.setFfprobePath(ffprobePath.path);
  }

  async generateVideoSegments(
    filePath: string,
    outputDir: string
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        await fs.mkdir(outputDir, { recursive: true });
        console.log('Output directory created:', outputDir);

        const command: FfmpegCommand = ffmpegLib(filePath)
          .on('filenames', (filenames: string[]) => {
            console.log('Generating video segments:', filenames);
          })
          .on('stderr', (line: string) => {
            console.log('FFmpeg stderr:', line);
          })
          .outputOptions([
            '-c:v libx264', // use libx264 codec
            '-c:a aac', // use AAC audio codec
            '-preset ultrafast', // FASTEST preset (sacrifices compression efficiency)
            '-crf 24', // same CRF, or you can adjust to e.g., 28 for even faster
            '-start_number 0',
            '-hls_time 10',
            '-hls_list_size 0',
            '-hls_playlist_type vod',
            '-f hls'
          ])
          .output(path.join(outputDir, 'index.m3u8'))
          .on('end', async () => {
            try {
              console.log('Video segments generation completed.');
              await fs.unlink(filePath);
              console.log('Original file removed:', filePath);
              resolve(true);
            } catch (err) {
              console.error('Error removing original file:', err);
              await fs.rm(outputDir, { recursive: true, force: true });
              resolve(false);
            }
          })
          .on('error', async (err: Error) => {
            console.error('FFmpeg error:', err);
            await fs.rm(outputDir, { recursive: true, force: true });
            resolve(false);
          });

        command.run();
      } catch (err) {
        console.error('Setup error:', err);
        resolve(false);
      }
    });
  }
}

const ffMpeg = new Ffmpeg();
export default ffMpeg;
