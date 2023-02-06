#include <napi.h>
#include <tuple>
#include "clipboard.h"

Napi::Array ReadFilePathsJs(const Napi::CallbackInfo &info)
{
    auto env = info.Env();
    const auto file_paths = ReadFilePaths();
    auto result = Napi::Array::New(env, file_paths.size());
    for (size_t i = 0; i != file_paths.size(); ++i)
    {
        result.Set(i, file_paths[i]);
    }
    return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("readFilePaths", Napi::Function::New(env, ReadFilePathsJs));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);
