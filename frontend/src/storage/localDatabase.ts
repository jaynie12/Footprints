import {
  enablePromise,
  openDatabase,
  type SQLiteDatabase,
} from 'react-native-sqlite-storage';

const databaseName = 'footprints.db';
let databasePromise: Promise<SQLiteDatabase> | undefined;

export async function initializeLocalDatabase(): Promise<void> {
  enablePromise(true);
  databasePromise ??= openDatabase({ name: databaseName });
  await databasePromise;
}
