{
  "targets": [
    {
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
      "target_name": "addon",
      "include_dirs": ["<!(node -p \"require('node-addon-api').include_dir\")"],
      "sources": ["export.cc"],
      "conditions": [
        [
          'OS=="mac"',
          {
            "sources": ["clipboard.mm"],
            "link_settings": {
              "libraries": ["-framework Cocoa", "-framework CoreFoundation"]
            },
            "xcode_settings": {
              "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
              "CLANG_ENABLE_OBJC_ARC": "YES",
              "OTHER_CFLAGS": ["-ObjC++", "-std=c++17"]
            }
          }
        ],
        [
          'OS=="win"',
          {
            "sources": ["clipboard.cc"],
            "libraries": ["Shlwapi.lib", "Shcore.lib"],
            "msvs_settings": {
              "VCCLCompilerTool": {
                "AdditionalOptions": ["/std:c++17"]
              }
            }
          }
        ]
      ]
    }
  ]
}
