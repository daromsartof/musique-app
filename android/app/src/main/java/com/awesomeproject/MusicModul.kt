package com.awesomeproject

import android.content.ContentResolver
import android.database.Cursor
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.media.MediaMetadataRetriever
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.File

class MusicModul(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var getArtistFromSong = false
    var reactContext = reactContext
    private var getDurationFromSong = true
    private var getTitleFromSong = true
    private var getIDFromSong = true
    private var getCoversFromSongs = true
    private var coversFolder = "/"
    private var coversResizeRatio = 1.0
    private var getIcons = false
    private var iconsSize = 125
    private var coversSize = 0

    private var getCoverFromSong = true
    private var coverFolder = "/"
    private var coverResizeRatio = 1.0
    private var getIcon = false
    private var iconSize = 125
    private var coverSize = 0

    private var delay = 100

    private var getGenreFromSong = false
    private var getAlbumFromSong = true
    private var minimumSongDuration = 0
    private var songsPerIteration = 0
    private var version = android.os.Build.VERSION.SDK_INT

    override fun getName(): String {
        return "MusicModul"
    }

    @ReactMethod
    fun getSongByPath(options: ReadableMap, successCallback: Callback, errorCallback: Callback) {
        coverFolder = options.getString("coverFolder") ?: coverFolder
        getCoverFromSong = options.getBoolean("cover") ?: getCoverFromSong
        coverResizeRatio = options.getDouble("coverResizeRatio") ?: coverResizeRatio
        getIcon = options.getBoolean("icon")?: getIcon
        iconSize = options.getInt("iconSize")?: iconSize
        coverSize = options.getInt("coverSize")?: coverSize

        val jsonArray: WritableArray = WritableNativeArray()
        val item: WritableMap = WritableNativeMap()
        options.getString("songUri")?.let { songUri ->
            //var songUri = options.getString("songUri")
            var title = ""
            var artist = ""
            var id: Long = -1
            var album = ""
            var duration = ""
            var songSrc = ""
            val projection = arrayOf(
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media._ID,
                MediaStore.Audio.Media.DATA
            )
            val musicUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
            currentActivity?.let { activity ->
                val cursor = activity?.contentResolver?.query(
                    musicUri, projection, MediaStore.Audio.Media.DATA + " like ? ", arrayOf(songUri), null
                )
                cursor?.use {
                    if(it.moveToFirst()){
                        title = it.getString(it.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE))
                        artist = it.getString(it.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST))
                        id = it.getLong(it.getColumnIndexOrThrow(MediaStore.Audio.Media._ID))
                        album = it.getString(it.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM))
                        duration = it.getString(it.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION))
                        songSrc = it.getString(it.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA))
                    } else {
                        Log.e("Musica", "cursor is either null or empty")
                        errorCallback.invoke("cursor is either null or empty")
                    }
                  
                } ?: run {
                    Log.e("Musica", "Cursor is null")
                    errorCallback.invoke("Cursor is null")
                }
            } ?: run {
                Log.e("musica", "no ID");
                errorCallback.invoke("activity null");
            }
            item.putString("id", id.toString())
            item.putString("path", songSrc)
            item.putString("title", title)
            item.putString("author", artist)
            item.putString("album", album)
            item.putString("duration", duration)
            jsonArray.pushMap(item)

            successCallback.invoke(jsonArray)
        } ?: run {
             Log.e("musica", "no ID");
            errorCallback.invoke("No song Uri");
        }
    }
    
    @ReactMethod
    fun getAll(options: ReadableMap, successCallback: Callback, errorCallback: Callback){
        if (options.hasKey("artist")) {
            getArtistFromSong = options.getBoolean("artist")
        }

        if (options.hasKey("duration")) {
            getDurationFromSong = options.getBoolean("duration")
        }

        if (options.hasKey("title")) {
            getTitleFromSong = options.getBoolean("title")
        }

        if (options.hasKey("id")) {
            getIDFromSong = options.getBoolean("id")
        }

       /*  if (options.hasKey("coverFolder")) {
            coversFolder = options.getString("coverFolder")
        }*/

        if (options.hasKey("cover")) {
            getCoversFromSongs = options.getBoolean("cover")
        }

        if (options.hasKey("coverResizeRatio")) {
            coversResizeRatio = options.getDouble("coverResizeRatio")
        }

        if (options.hasKey("icon")) {
            getIcons = options.getBoolean("icon")
        }
        if (options.hasKey("iconSize")) {
            iconsSize = options.getInt("iconSize")
        }

        if (options.hasKey("coverSize")) {
            coversSize = options.getInt("coverSize")
        }

        if (options.hasKey("genre")) {
            getGenreFromSong = options.getBoolean("genre")
        }

        if (options.hasKey("album")) {
            getAlbumFromSong = options.getBoolean("album")
        }

        if (options.hasKey("delay")) {
            delay = options.getInt("delay")
        }

        /*
         * if (options.hasKey("date")) { getDateFromSong = options.getBoolean("date"); }
         * 
         * if (options.hasKey("comments")) { getCommentsFromSong =
         * options.getBoolean("comments"); }
         * 
         * if (options.hasKey("lyrics")) { getLyricsFromSong =
         * options.getBoolean("lyrics"); }
         */

         if (options.hasKey("batchNumber")) {
            songsPerIteration = options.getInt("batchNumber");
        }

        if (options.hasKey("minimumSongDuration") && options.getInt("minimumSongDuration") > 0) {
            minimumSongDuration = options.getInt("minimumSongDuration");
        } else {
            minimumSongDuration = 0;
        }

        if (version <= 19) {
            getSongs(options, successCallback, errorCallback)
        } else {
            val bgThread = Thread(Runnable {
                getSongs(options, successCallback, errorCallback)
            }, "asyncTask")
            bgThread.priority = Thread.NORM_PRIORITY // Adjusted as Kotlin does not support setting stack size directly
            bgThread.start()
        }
        
    }

    @ReactMethod
    private fun getSongs(options: ReadableMap, successCallback: Callback, errorCallback: Callback){
        var musicResolver = currentActivity?.contentResolver
        var musicUri: Uri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
        var selection: String = MediaStore.Audio.Media.IS_MUSIC + "!= 0"

        if(minimumSongDuration > 0){
            selection += " AND " + MediaStore.Audio.Media.DURATION + " >= " + minimumSongDuration
        }
        val projection = arrayOf(
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media._ID,
                MediaStore.Audio.Media.DATA
        )
        var sortOrder: String = MediaStore.Audio.Media.TITLE + " ASC"
        var musicCursor = musicResolver?.query(musicUri, projection, selection, null, sortOrder)
        var pointer = 0
        var mapSize = 0
      //  successCallback.invoke("Music cursor count "+ musicCursor?.getCount().toString())
        if(musicCursor != null){
            Log.i("RNAndroidStore", "No Music Files found")
            sendEvent(reactContext, "NoMusicFilesFound", null)

            musicCursor?.use{
                if(it.moveToFirst()){
                    if (it.getCount() > 0) {

                        var jsonArray: WritableArray =  WritableNativeArray()
                        var items : WritableMap
                        var mmr: MediaMetadataRetriever=  MediaMetadataRetriever()
    
                        var idColumn = it.getColumnIndex(android.provider.MediaStore.Audio.Media._ID)
                      //  successCallback.invoke(idColumn)
                        try {

                            do {
                               try {
                                    items = WritableNativeMap()
                                    var songId = it.getLong(idColumn)
                                    if (getIDFromSong) {
                                        items.putString("id", it.getString(4))
                                    }

                                    var songPath : String = it.getString(5)

                                    if (songPath != null && songPath != "") {
                                        var fileName: String = songPath.substring(songPath.lastIndexOf("/") + 1)

                                        // by default, always return path and fileName
                                        items.putString("path", songPath)
                                        items.putString("fileName", fileName)
    
                                        // String songTimeDuration =
                                        // mmr.extractMetadata(FFmpegMediaMetadataRetriever.METADATA_KEY_DURATION);
                                        var songTimeDuration: String = it.getString(3)
                                        var songIntDuration = songTimeDuration.toInt()

                                        if (getAlbumFromSong) {
                                            items.putString("album",  it.getString(2))
                                        }
    
                                        if (getArtistFromSong) {
                                            items.putString("author", it.getString(1))
                                        }
    
                                        if (getTitleFromSong) {
                                            items.putString("title", it.getString(0))
                                        }
    
                                     /* if (getGenreFromSong) {
                                            items.putString("genre", mmr.extractMetadata(mmr.METADATA_KEY_GENRE))
                                        } */  
    
                                        if (getDurationFromSong) {
                                            items.putString("duration", songTimeDuration);
                                        }
                                        jsonArray.pushMap(items);
                                        mapSize++;
                                        if (songsPerIteration > 0) {
    
                                            if (songsPerIteration > it.getCount()) {
    
                                                if (pointer == (it.getCount() - 1)) {
                                                    var params: WritableMap = Arguments.createMap()
                                                    params.putArray("batch", jsonArray)
                                                    sendEvent(reactContext, "onBatchReceived", params)
                                                    sendEvent(reactContext, "onLastBatchReceived", null)
                                                }
                                            } else {
    
                                                if (songsPerIteration == mapSize) {
                                                    var params: WritableMap= Arguments.createMap()
                                                    params.putArray("batch", jsonArray)
                                                    sendEvent(reactContext, "onBatchReceived", params)
                                                    jsonArray = WritableNativeArray()
                                                    mapSize = 0
                                                    Thread.sleep(delay.toLong())
                                                } else if (pointer == (it.getCount() - 1)) {
                                                    var params : WritableMap = Arguments.createMap()
                                                    params.putArray("batch", jsonArray)
                                                    sendEvent(reactContext, "onBatchReceived", params)
                                                    sendEvent(reactContext, "onLastBatchReceived", null)
                                                }
                                            }
                                            pointer++;
                                        }
                                    }
                               }
                               catch(e: Exception) {
                                    pointer++

                                    continue
                               }
                            } while (it.moveToNext())
                            
                            if (songsPerIteration == 0) {
                                successCallback.invoke(jsonArray)
                            }
                        }  catch (e: RuntimeException) {
                            errorCallback.invoke(e.toString())
                        } catch (e: Exception) {
                            errorCallback.invoke(e.message)
                        } finally {
                            mmr.release()
                        }
                        
                    } else {
                        Log.i("RNAndroidStore", "Error, you dont' have any songs")
                        successCallback.invoke("Error, you dont' have any songs")
                    }
                } else {
                    Log.i("RNAndroidStore", "Something went wrong with musicCursor")
                    errorCallback.invoke("Something went wrong with musicCursor")
                }
            }
            musicCursor.close()
        }
    }


    private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: WritableMap?) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)?.emit(eventName, params)
    }


}
