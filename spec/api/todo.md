List Devices: 
  USER: GET /api/self/devices ???

    filter=<FILTER>
    &sort=<SORT>
    &limit=<LIMIT>

RESULT: implemented get request, endpoint returns 404




Update Device Properties:
          POST /api/device/<UUID>
          {
              "friendly_name" : <NEW_FRIENDLY_NAME>,
              "location_note" : <NEW_LOCATION_NOTE>
          }

          
Add/Update Cloud Var Metadata:

          POST /api/device/<UUID>
          {
              "sddl" : {
                  <VAR_DECL> : <VAR_PROPERTIES>,
                  ...
              }
          }

    * Full Replacement: 

            POST /api/device/<UUID>
            {
                "sddl" : {
                    "full-replacement" : true,
                    <VAR_DECL> : <VAR_PROPERTIES>,
                    ...
                }
            }

Update a Cloud Var Value:

        POST /api/device/<UUID>
        {
            "vars" : {
                <VAR_NAME> : <NEW_VALUE>,
                ...
            }
        }